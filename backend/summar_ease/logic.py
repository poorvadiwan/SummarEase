from langchain.text_splitter import NLTKTextSplitter
from .pdf import extract_text_from_pdf
from .summary import *
from .keyword import keywords_processor_multithreading
from .video import create_video_from_image_sentence, concatenate_videos
from .chunks import chunk_creator
import subprocess
import os
import time


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
    end_time = 0

    for _, (video_file, subtitle) in enumerate(zip(video_files, subtitles), start=1):
        # Get duration of current video segment
        duration = get_video_duration(video_file)

        # Calculate end time for the subtitle segment
        end_time = start_time + duration

        # Split subtitle into phrases
        phrases = split_sentence_into_phrases(subtitle)

        # Calculate duration for each phrase
        phrase_duration = duration / len(phrases)

        # Initialize phrase start time
        phrase_start_time = start_time

        # Write subtitles for each phrase
        for phrase in phrases:
            # Calculate end time for the current phrase
            phrase_end_time = phrase_start_time + phrase_duration

            # Write subtitle index
            srt_content += f"{i}\n"

            # Write time range
            srt_content += f"{format_time(phrase_start_time)} --> {format_time(phrase_end_time)}\n"

            # Write subtitle text
            srt_content += phrase + "\n\n"

            # Update start time for next phrase
            phrase_start_time = phrase_end_time
            i += 1

        # Update start time for next subtitle
        start_time = end_time

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

def split_sentence_into_phrases(sentence, max_phrase_length=10):
    words = sentence.split()
    phrases = []
    current_phrase = ""
    for word in words:
        if len(current_phrase.split()) < max_phrase_length:
            current_phrase += word + " "
        else:
            phrases.append(current_phrase.strip())
            current_phrase = word + " "
    if current_phrase:
        phrases.append(current_phrase.strip())
    return phrases

def video_gen(pdf_file_path: str, id: str):
    print('Video generation started!!')

    final_videos = []
    final_summary = []
    all_subtitles = []  # List to store subtitles for all chunks

    extracted_text =  extract_text_from_pdf(pdf_file_path)
    chunk_list = chunk_creator(extracted_text)

    for ele in chunk_list:
        print(len(ele))

    print("Divided into chunks!!")

    time1 = time.time()
    summarized_chunks = chunks_summarizer(chunk_list)
    print(f"Time taken to summarize chunks: {(time.time() - time1)}")
    print(summarized_chunks)

    start_time = 0
    subtitle_index = 1

    for i in range(len(chunk_list)):
        summary = summarized_chunks.get(i).get('summary')
        summary_id = summarized_chunks.get(i).get('id')
        final_summary.append(summary)
        summary_sentences = summary.split('. ')

        # summary_sentences = split_sentence_into_phrases(summary)

        video_files = []
        subtitles = []

        now = time.time()
        extracted_keywords: dict = keywords_processor_multithreading(summary_sentences, len(summary_sentences))
        print(extracted_keywords)
        print(f"Time taken to extract keywords: {time.time() - now}")

        respective_chunk_dir = os.path.join(os.getcwd(), str(summary_id))
        os.makedirs(respective_chunk_dir, exist_ok=True)
        os.chdir(respective_chunk_dir)

        for i, sentence in enumerate(summary_sentences):
            success = False
            while not success:
                try:
                    create_video_from_image_sentence(sentence, extracted_keywords.get(i), str(i))
                    success = True
                except OSError:
                    create_video_from_image_sentence(sentence, extracted_keywords.get(i), str(i))
                    success = True

            video_files.append(respective_chunk_dir + '/' + str(i) + '.mp4')
            subtitles.append(sentence)

        os.chdir('..')

        final_video_file = respective_chunk_dir + '/' + str(summary_id) + '.mp4'
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
