import os
from bs4 import BeautifulSoup
import requests
from logic import extract_keywords, create_video_from_image_sentence, concatenate_videos
import json


NEURELO_KEY = os.environ.get("NEURELO_KEY")

def scrape_trends():
    url = 'https://inshorts.com/en/read/technology'

    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"}

    response = requests.get(url=url, headers=headers)

    soup = BeautifulSoup(response.content, 'html.parser')

    headline_list = []
    headlines = soup.find_all('span', itemprop='headline')
    for headline in headlines:
        headline_list.append(headline.text)

    text_list = []
    texts = soup.find_all('div', itemprop='articleBody')
    for text in texts:
        text_list.append(text.text)

    return (headline_list, text_list)


def main():
    if not os.path.exists('videos'):
        os.mkdir('videos')
    os.chdir('videos')

    headlines, texts = scrape_trends()

    for i in range(len(texts)):
        video_files = []
        sentence_list = texts[i].split(". ")
        for j, sentence in enumerate(sentence_list):
            extracted_keywords = extract_keywords(sentence)
            extracted_keywords = extracted_keywords.text
            extracted_keywords = extracted_keywords[1:-1]
            extracted_keywords = json.loads(extracted_keywords)
            extracted_keywords = extracted_keywords.get("generated_text").split(", ")

            success = False
            while not success:
                try:
                    create_video_from_image_sentence(sentence, extracted_keywords[0], str(j))
                    success = True
                except OSError:
                    create_video_from_image_sentence(sentence, extracted_keywords[0], str(j))
                    success = True

            video_files.append(str(j) + '.mp4')
            concatenate_videos(video_files, str(i) + '.mp4')

            url = "https://ap-south-1.aws.neurelo.com/rest/Trends/__one?"
            headers = {
                "X-API-KEY": f"{NEURELO_KEY}"
            }
            payload = {
                'name': headlines[i],
                'summary': texts[i],
                'video': "https://summar-ease.s3.amazonaws.com/videos/" + str(i) + ".mp4",
                'views': 0
            }

            requests.post(url, headers=headers, json=payload)
        os.chdir('..')


main()
