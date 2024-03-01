from multiprocessing import Manager
from threading import Thread
import json
import requests


def summarize(text):
    print("Text summarization started!!")
    url = "https://api.cohere.ai/v1/summarize"

    payload = json.dumps({
        "text": text,
        "length": "long",
        "format": "auto",
        "model": "command",
        "extractiveness": "medium",
        "additional_command": "",
        "temperature": 0.3
    })
    headers = {
        'Authorization': 'Bearer cKy9CSPqUCPEkaWAk8SnIofoH1zXZB4nXG08BgpZ',
        'Content-Type': 'application/json'
    }
    response = requests.request("POST", url, headers=headers, data=payload)
    response = json.loads(response.text)

    print("Text summarized!!")
    return response


def chunks_summarizer(chunk_list: list):
    manager = Manager()
    summarized_chunks = manager.dict()
    threads = []

    for i, text in enumerate(chunk_list):
        t = Thread(target=lambda: summarized_chunks.update({i: summarize(text)}))
        threads.append(t)
        t.start()

    for t in threads:
        t.join()

    return summarized_chunks
