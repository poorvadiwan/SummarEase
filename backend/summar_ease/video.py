from time import sleep

from .keyword import download_image_from_keyword
from .audio import text_to_speech, create_audio_from_sentence

import moviepy.editor as editor
import os


def create_video(output_file, img):
    audio = editor.AudioFileClip(output_file + ".mp3")
    video = editor.ImageClip(img).set_duration(audio.duration).set_audio(audio)
    video.write_videofile(output_file + ".mp4",  codec='libx265', fps=1)


def concatenate_videos(video_files: list, output_file: str):
    print('Concatenating videos!!')
    video_clips = [editor.VideoFileClip(video_file) for video_file in video_files]

    final_video = editor.concatenate_videoclips(video_clips, method="compose")
    final_video.write_videofile(output_file,  codec='libx265', fps=1)


def create_video_from_image_sentence(sentence, keyword, output_file):
    print('Creating video from image and sentence!!')
    audio_file = 'test.mp3'

    download_image_from_keyword(keyword),
    text_to_speech(sentence, audio_file)

    #image_downloading_thread = Process(target=download_image_from_keyword, args=(keyword,))
    #audio_creation_thread = Process(target=create_audio_from_sentence, args=(sentence, audio_file))

    #image_downloading_thread.start()
    #audio_creation_thread.start()

    #image_downloading_thread.join()
    #audio_creation_thread.join()

    success = False
    while success is not True:
        try:
            img = [f for f in os.listdir('./') if f.endswith(('.jpg', '.png', '.jpeg'))][0]
            success = True
        except IndexError:
            print('Image download failed, trying again 1 !!')
            download_image_from_keyword(keyword)

    success = False
    while success is not True:
        try:
            os.rename(audio_file, audio_file.replace('test', output_file))
            success = True
        except FileNotFoundError:
            sleep(1)

    create_video(output_file, img)

    os.remove(img)
    os.remove(output_file + ".mp3")
