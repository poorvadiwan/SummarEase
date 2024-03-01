from multiprocessing import Process, Manager
from threading import Thread
from concurrent.futures import ThreadPoolExecutor
import time
import json
import requests
from gradio_client import Client



def keywords_processor_multithreading(summary_sentences: list):
    print(summary_sentences)
    manager = Manager()
    extracted_keywords = manager.dict()
    threads = []

    def process_sentence(index, text):
        extracted_keywords[index] = get_and_process_keywords_from_sentence(text)

    with ThreadPoolExecutor(max_workers=15) as executor:
        for i, text in enumerate(summary_sentences):
            executor.submit(process_sentence, i, text)

    return extracted_keywords


def extract_keywords(sentence):
    print("Keyword extraction started!!")
    url = "https://api-inference.huggingface.co/models/transformer3/H1-keywordextractor"

    payload = {
        "inputs": sentence
    }

    headers = {
        'Authorization': 'Bearer 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',
        'Content-Type': 'application/json'
    }

    response = requests.request("POST", url, headers=headers, data=payload)

    if 'error' in response.text:
        print("Keyword extraction failed, trying again!!")
        time.sleep(5)
        response = extract_keywords(sentence)

    print("Keywords extracted!!")
    return response


def keywords_list_processor(keywords_list: list):
    max_words_in_keyword = 0
    curr_keyword = None

    for i, keyword in enumerate(keywords_list):
        keyword = keyword.split(' ')
        if len(keyword) > max_words_in_keyword:
            max_words_in_keyword = len(keyword)
            curr_keyword = keywords_list[i]

    return curr_keyword


def get_and_process_keywords_from_sentence(sentence: str):
    keyword = extract_keywords(sentence)
    keyword = json.loads(keyword.text)[0].get('summary_text')
    keyword = keyword.split(', ')
    keyword = keywords_list_processor(keyword)
    # print(keyword)

    return keyword.strip()


if __name__ == '__main__':
    text_list = '''‭Hardening of an operating system involves the implementation of security measures to make‬
‭the system compliant with the security policies of the organization. The procedure for hardening‬
‭should be intuitive to allow ease of use by personnel with minimal IT skills. The goal of this‬
‭problem statement is to generate a script that undertakes hardening of Ubuntu OS using an‬
‭GUI-based approach. During the hardening process, the user should have the flexibility to make‬
‭settings based on the organisation's IT security policy provision like blocking ssh, usb, ToR etc.‬
‭The grading of tool will be based on the hardening functions implemented, attention to user‬
‭experience and flexibility to take user settings. Developers should remember that security is of‬
‭utmost importance.

‭The solution addresses Ubuntu hardening via a GUI-driven application, offering essential‬
‭features like security upgrades, patch management, and purging of redundant packages. Key‬
‭functionalities span firewall configuration, port and USB management, core OS fortification, and‬
‭TOR network blocking. Embracing CIS Benchmarks, it structures features into two tiers, Level 1‬
‭and Level 2, considering their impact and user interaction.‬
‭ rchitecture-wise, the user interacts with a Tauri-built frontend, powered by React, enabling‬
A
‭seamless engagement. Backend functionalities leverage Rust for robust integration. The system‬
‭effectuates changes in real time, generating logs that ensure transparency and enable‬
‭continuous system monitoring.‬
‭ ustomizability is a cornerstone, allowing users to tailor settings in adherence to organizational‬
C
‭policies. The GUI presents options for default CIS Benchmark settings while offering flexibility‬
‭for custom configurations. Administrators can export manual configurations as Bash scripts,‬
‭facilitating easy distribution and replication across systems within the organization.‬
‭This approach not only streamlines the hardening process but also fosters compliance with‬
‭security protocols. By enabling the export of configurations as executable scripts, the tool‬
‭ensures a unified, standardized system-hardening approach across the'''
    now = time.time()
    text_list = text_list.split('. ')
    print(len(text_list))
    print(keywords_processor_multithreading(text_list))
    print(time.time() - now)