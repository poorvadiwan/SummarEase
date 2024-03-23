from concurrent.futures import ProcessPoolExecutor
import moviepy.editor as editor
import os


def create_video_from_image_audio(image_file, audio_file, output_file):
    audio_file = editor.AudioFileClip(audio_file)
    video = editor.ImageClip(image_file).set_duration(audio_file.duration).set_audio(audio_file)
    video.write_videofile(output_file,  codec='libx265', fps=1)

    os.remove(image_file)
    os.remove(audio_file.filename)


def concatenate_final_videos(video_files: list, output_file: str):
    print('Concatenating videos!!')
    video_clips = [editor.VideoFileClip(video_file) for video_file in video_files]

    final_video = editor.concatenate_videoclips(video_clips, method="compose")
    final_video.write_videofile(output_file,  codec='libx265', fps=1)


def concatenate_videos(respective_chunk_dir: str, num: int, output_file: str):
    print('Concatenating videos!!')
    video_clips = [editor.VideoFileClip(respective_chunk_dir + '/' + str(video_file) + '.mp4') for video_file in range(num)]

    final_video = editor.concatenate_videoclips(video_clips, method="compose")
    final_video.write_videofile(output_file,  codec='libx265', fps=1)


def create_video_from_image_audio_multiprocessing(num, keywords):
    with ProcessPoolExecutor() as executor:
        for i in range(num):
            executor.submit(create_video_from_image_audio, keywords.get(i)[1], str(i)+'.mp3', str(i)+'.mp4')
