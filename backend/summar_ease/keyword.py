from concurrent.futures import ThreadPoolExecutor
from multiprocessing import Manager
from time import sleep
import json
import requests


def h1_keyword_extractor(sentence) -> str:
    print("Keyword extraction started!!")
    url = "https://api-inference.huggingface.co/models/transformer3/H1-keywordextractor"

    payload = json.dumps({
        "inputs": sentence
    })

    headers = {
        'Authorization': 'Bearer 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',
        'Content-Type': 'application/json'
    }

    response = requests.request("POST", url, headers=headers, data=payload)

    if 'error' in response.text:
        print("Keyword extraction failed, trying again!!")
        sleep(5)
        response = h1_keyword_extractor(sentence)

    print("Keywords extracted!!")
    return response


def keywords_list_processor(keywords_list: list) -> str:
    max_words_in_keyword = 0
    curr_keyword = None

    for i, keyword in enumerate(keywords_list):
        keyword = keyword.split(' ')
        if len(keyword) > max_words_in_keyword:
            max_words_in_keyword = len(keyword)
            curr_keyword = keywords_list[i]
    return curr_keyword


def get_and_process_keywords_from_sentence(sentence: str) -> str:
    keyword = h1_keyword_extractor(sentence)
    keyword = json.loads(keyword.text)[0].get('summary_text')
    keyword = keyword.split(', ')
    keyword = keywords_list_processor(keyword)
    return keyword.strip()


def keywords_processor_multithreading(summary_sentences: list, max_workers=10) -> dict:
    manager = Manager()
    extracted_keywords = manager.dict()

    def process_sentence(index, text):
        extracted_keywords[index] = get_and_process_keywords_from_sentence(text)
        # print(f"Processed sentence {index}, {text}, {extracted_keywords[index]}!!")

    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        for i, text in enumerate(summary_sentences):
            executor.submit(process_sentence, i, text)

    return extracted_keywords
