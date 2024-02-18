from tempfile import NamedTemporaryFile
from time import sleep
from PyPDF2 import PdfReader
import requests
import json
import os
from icrawler.builtin import GoogleImageCrawler
from mutagen.mp3 import MP3
from PIL import Image
from pathlib import Path
import os
import imageio
import moviepy.editor as editor
import pyttsx3
from pydub import AudioSegment
from gtts import gTTS
from langchain.text_splitter import NLTKTextSplitter


class TextToSpeech:
    engine: pyttsx3.Engine

    def __init__(self, rate: int, volume: float):
        self.engine = pyttsx3.init()
        self.engine.setProperty('rate', rate)
        self.engine.setProperty('volume', volume)

    def list_voices(self):
        voices = self.engine.getProperty('voices')
        for voice in voices:
            print(voice, voice.id, voice.languages, voice.gender)

    def speak(self, text: str, save: bool, file_name: str):
        # self.engine.say(text)
        self.engine.save_to_file(text=text, filename=file_name)
        self.engine.runAndWait()

def summarize(text):
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
    print("Text summarized!!")
    return response.text


def extract_keywords(sentence):
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
        response = extract_keywords(sentence)

    return response


def download_image_from_keyword(keyword: str):
    google_crawler = GoogleImageCrawler(storage={'root_dir': './'})
    google_crawler.crawl(keyword=keyword, max_num=1)


def create_audio_from_sentence(sentence, output_file):
    tts = TextToSpeech(rate=158, volume=1.0)
    tts.speak(text=sentence, save=True, file_name=output_file)


def create_video(output_file, img):
    audio = editor.AudioFileClip(output_file + ".mp3")
    video = editor.ImageClip(img).set_duration(audio.duration).set_audio(audio)
    video.write_videofile(output_file + ".mp4",  codec='libx264', fps=24)


def create_video_from_image_sentence(sentence, keyword, output_file):
    audio_file = 'test.mp3'

    download_image_from_keyword(keyword),
    create_audio_from_sentence(sentence, audio_file)

    try:
        img = [f for f in os.listdir('./') if f.endswith(('.jpg', '.png', '.jpeg'))][0]
    except IndexError:
        try:
            download_image_from_keyword(keyword)
            img = [f for f in os.listdir('./') if f.endswith(('.jpg', '.png', '.jpeg'))][0]
        except IndexError:
            download_image_from_keyword(keyword)
            img = [f for f in os.listdir('./') if f.endswith(('.jpg', '.png', '.jpeg'))][0]

    sleep(2)
    os.rename(audio_file, audio_file.replace('test', output_file))

    create_video(output_file, img)

    os.remove(img)
    os.remove(output_file + ".mp3")


def concatenate_videos(video_files: list, output_file: str):
    video_clips = [editor.VideoFileClip(video_file) for video_file in video_files]

    final_video = editor.concatenate_videoclips(video_clips, method="compose")
    final_video.write_videofile(output_file,  codec='libx264', fps=24)


def process_uploaded_pdf(uploaded_pdf):
    with NamedTemporaryFile(delete=False, suffix='.pdf') as temp_file:
        temp_file.write(uploaded_pdf.read())
        temp_file.close()
        extracted_text = extract_text_from_pdf(temp_file)
        os.unlink(temp_file.name)  # Remove the temporary file after use
        return extracted_text


def extract_text_from_pdf(pdf):
    with open(pdf, 'rb') as file:
        pdf_reader = PdfReader(file)
        text = ''
        for page_num in range(len(pdf_reader.pages)):
            text += pdf_reader.pages[page_num].extract_text()
        print("Text Extracted!!")
        return text


def video_gen(pdf_file_path: str, id: str):
    final_videos = []
    final_summary = []

    extracted_text =  extract_text_from_pdf(pdf_file_path)

    if len(extracted_text) > 15000:
        chunk_size = 15000
    else:
        chunk_size = len(extracted_text)

    text_splitter = NLTKTextSplitter(chunk_size=chunk_size)
    texts = text_splitter.split_text(extracted_text)
    print("Divided into chunks!!")
    for chunk_count in range(int(len(extracted_text)/chunk_size)):
        chunk = texts[chunk_count]

        summarized_text = json.loads(summarize(chunk))

        summarized_text_id = summarized_text.get('id')
        summarized_text_summary = summarized_text.get('summary')
        final_summary.append(summarized_text_summary)
        summary_sentences = summarized_text_summary.split('. ')

        # print(summarized_text_id)
        # print()
        # print(summarized_text_summary)
        # print()
        # print(summary_sentences)

        video_files = []
        extracted_keywords = None

        # summary_sentences = ['Phone is an electronic device, it"s portable.', 'In recent times, portable devices has been in trend loved by everyone.', 'It is used for communication, entertainment, and work.']

        for i, sentence in enumerate(summary_sentences):
            print(sentence)

            extracted_keywords = extract_keywords(sentence)
            extracted_keywords = extracted_keywords.text
            extracted_keywords = extracted_keywords[1:-1]
            extracted_keywords = json.loads(extracted_keywords)
            extracted_keywords = extracted_keywords.get("summary_text").split(", ")

            print(extracted_keywords)

            success = False
            while not success:
                try:
                    create_video_from_image_sentence(sentence, extracted_keywords[0], str(i))
                    success = True
                except OSError:
                    create_video_from_image_sentence(sentence, extracted_keywords[0], str(i))
                    success = True

            video_files.append(str(i) + '.mp4')

        final_video_file = str(summarized_text_id) + '.mp4'
        final_videos.append(final_video_file)
        concatenate_videos(video_files, final_video_file)

        for file in video_files:
            os.remove(file)

    concatenate_videos(final_videos, id + ".mp4")
    for file in final_videos:
        os.remove(file)

    return final_summary