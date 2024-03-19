from tempfile import NamedTemporaryFile
from time import sleep
from PyPDF2 import PdfReader
from langchain.text_splitter import NLTKTextSplitter
from icrawler.builtin import GoogleImageCrawler
from math import ceil
from threading import Thread
from multiprocessing import Process
import subprocess
import requests
import json
import os
import os
import moviepy.editor as editor
import pyttsx3
from gtts import gTTS
import nltk
import uuid


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

def text_to_speech(text, audio_file):
    speech = gTTS(text, lang='en', slow=False)
    speech.save(audio_file)


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
    print("Text summarized!!")
    return response.text


def extract_keywords(sentence):
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
        response = extract_keywords(sentence)

    print("Keywords extracted!!")
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
    print('Creating video from image and sentence!!')
    audio_file = 'test.mp3'

    download_image_from_keyword(keyword),
    text_to_speech(sentence, audio_file)

    # t1 = Process(target=download_image_from_keyword, args=(keyword,))
    # t2 = Process(target=create_audio_from_sentence, args=(sentence, audio_file))

    # t1.start()
    # t2.start()
    # t1.join()
    # t2.join()

    try:
        img = [f for f in os.listdir('./') if f.endswith(('.jpg', '.png', '.jpeg'))][0]
    except IndexError:
        try:
            print('Image download failed, trying again 1 !!')
            download_image_from_keyword(keyword)
            # t1.start()
            # t1.join()
            img = [f for f in os.listdir('./') if f.endswith(('.jpg', '.png', '.jpeg'))][0]
        except IndexError:
            print('Image download failed, trying again 2 !!')
            download_image_from_keyword(keyword)
            # t1.start()
            # t1.join()
            img = [f for f in os.listdir('./') if f.endswith(('.jpg', '.png', '.jpeg'))][0]

    sleep(2)
    os.rename(audio_file, audio_file.replace('test', output_file))

    create_video(output_file, img)

    os.remove(img)
    os.remove(output_file + ".mp3")


def concatenate_videos(video_files: list, output_file: str):
    print('Concatenating videos!!')
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
    print("Text Extraction started!!")
    with open(pdf, 'rb') as file:
        pdf_reader = PdfReader(file)
        text = ''
        for page_num in range(len(pdf_reader.pages)):
            text += pdf_reader.pages[page_num].extract_text()
        print("Text Extracted!!")
        return text
    

def get_video_duration(video_file_path: str) -> float:
    """
    Get the duration of a video file in seconds.
    
    Args:
        video_file_path (str): Path to the video file.
    
    Returns:
        float: Duration of the video in seconds.
    """
    try:
        result = subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'default=noprint_wrappers=1:nokey=1', video_file_path], stdout=subprocess.PIPE, stderr=subprocess.PIPE, check=True)
        duration = float(result.stdout)
    except Exception as e:
        print(f"Error getting video duration: {e}")
        duration = 0.0
    return duration

def format_time(seconds: float) -> str:
    """
    Format time in seconds to HH:MM:SS.SSS format.
    
    Args:
        seconds (float): Time duration in seconds.
    
    Returns:
        str: Formatted time string in HH:MM:SS.SSS format.
    """
    hours, remainder = divmod(seconds, 3600)
    minutes, seconds = divmod(remainder, 60)
    return f"{int(hours):02d}:{int(minutes):02d}:{seconds:.3f}"


def generate_srt_file(video_files, subtitles, starting_time, i):
    """
    Generate an SRT string for the given list of video files and subtitles.
    
    Args:
        video_files (List[str]): List of video file paths.
        subtitles (List[str]): List of subtitles corresponding to each video file.
        starting_time (int): Starting time for the SRT file.
        
    Returns:
        Tuple[str, int]: SRT content as a string and end time of the last subtitle segment.
    """
    # Initialize start time for the first subtitle
    start_time = starting_time
    srt_content = ""

    for _, (video_file, subtitle) in enumerate(zip(video_files, subtitles), start=1):
        # Get duration of current video segment
        duration = get_video_duration(video_file)

        # Calculate end time for the subtitle segment
        end_time = start_time + duration

        # Write subtitle index
        srt_content += f"{i}\n"

        # Write time range
        srt_content += f"{format_time(start_time)} --> {format_time(end_time)}\n"

        # Write subtitle text
        srt_content += subtitle + "\n\n"

        # Update start time for next subtitle
        start_time = end_time

        i=i+1

    return srt_content, end_time, i

def concatenate_subtitles(subtitles_list, output_file):
    concatenated_subtitles = ""
    for subtitle_content in subtitles_list:
        concatenated_subtitles += subtitle_content + "\n\n"

    print(concatenated_subtitles)
    # Write the concatenated subtitles to the output file
    with open(output_file, "w") as f:
        f.write(concatenated_subtitles)

    print(f"Final subtitles saved to '{output_file}'")

def video_gen(pdf_file_path: str, id: str):
    print('Video generation started!!')
    final_videos = []
    final_summary = []
    all_subtitles = []  # List to store subtitles for all chunks

    extracted_text = extract_text_from_pdf(pdf_file_path)
    number_of_characters = len(extracted_text)

    if number_of_characters > 4500:
        chunk_size = 4500
    else:
        chunk_size = number_of_characters

    text_splitter = NLTKTextSplitter(chunk_size=chunk_size)
    texts = text_splitter.split_text(extracted_text)
    number_of_chunks = ceil(number_of_characters / chunk_size)

    start_time = 0
    subtitle_index = 1


    for chunk_count in range(number_of_chunks):
        chunk = texts[chunk_count]

        summarized_text = json.loads(summarize(chunk))
        summarized_text_id = summarized_text.get('id')
        summarized_text_summary = summarized_text.get('summary')
        final_summary.append(summarized_text_summary)
        summary_sentences = summarized_text_summary.split('. ')

        video_files = []
        subtitles = []

        respective_chunk_dir = os.path.join(os.getcwd(), str(summarized_text_id))
        os.makedirs(respective_chunk_dir, exist_ok=True)
        os.chdir(respective_chunk_dir)

        for i, sentence in enumerate(summary_sentences):
            extracted_keywords = extract_keywords(sentence)
            extracted_keywords = extracted_keywords.text
            extracted_keywords = extracted_keywords[1:-1]
            extracted_keywords = json.loads(extracted_keywords)
            extracted_keywords = extracted_keywords.get("summary_text").split(", ")

            success = False
            while not success:
                try:
                    create_video_from_image_sentence(sentence, extracted_keywords[0], str(i))
                    success = True
                except OSError:
                    create_video_from_image_sentence(sentence, extracted_keywords[0], str(i))
                    success = True

            video_files.append(respective_chunk_dir + '/' + str(i) + '.mp4')
            subtitles.append(sentence)

        os.chdir('..')

        final_video_file = respective_chunk_dir + '/' + str(summarized_text_id) + '.mp4'
        final_videos.append(final_video_file)

        # Generate SRT for the chunk and add to all_subtitles list
        srt_content, start_time, subtitle_index = generate_srt_file(video_files, subtitles, starting_time=start_time, i=subtitle_index)
        all_subtitles.append(srt_content)
        print("SRT content generated for a video chunk")

        concatenate_videos(video_files, final_video_file)

    # Concatenate all SRT contents and save the final SRT file
    concatenate_subtitles(all_subtitles, "subtitles.srt")
    print("Final SRT file generated for the video")

    print('Concatenating final videos!!')

    if len(final_videos) > 1:
        concatenate_videos(final_videos, id + ".mp4")
    else:
        os.rename(final_videos[0], id + ".mp4")

    return final_summary
