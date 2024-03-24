import os
import time
from .audio import gtts_multithreading
from .chunks import chunk_creator
from .image import download_images_from_keyword_multithreading
from .keyword import keywords_processor_multithreading
from .pdf import extract_text_from_pdf
from .summary import chunks_summarizer
from .video import concatenate_final_videos, concatenate_videos, create_video_from_image_audio_multiprocessing


def video_gen(pdf_file_path: str, id: str):
    print('Video generation started!!')

    final_videos = []
    final_summary = []

    extracted_text =  extract_text_from_pdf(pdf_file_path)
    chunk_list = chunk_creator(extracted_text)

    for ele in chunk_list:
        print(len(ele))

    print("Divided into chunks!!")

    now = time.perf_counter()
    summarized_chunks = chunks_summarizer(chunk_list)
    print(f"Time taken to summarize chunks: {(time.perf_counter() - now)}")

    print(summarized_chunks)

    for i in range(len(chunk_list)):
        try:
            summary = summarized_chunks.get(i).get('summary')
            summary_id = summarized_chunks.get(i).get('id')
            final_summary.append(summary)
            summary_sentences = summary.split('. ')
        except AttributeError:
            continue

        now = time.perf_counter()
        extracted_keywords: dict = keywords_processor_multithreading(summary_sentences, len(summary_sentences))
        print(f"Time taken to extract keywords: {time.perf_counter() - now}")

        print(extracted_keywords)

        respective_chunk_dir = os.path.join(os.getcwd(), str(summary_id))
        os.makedirs(respective_chunk_dir, exist_ok=True)
        os.chdir(respective_chunk_dir)

        now = time.perf_counter()
        extracted_keywords = download_images_from_keyword_multithreading(extracted_keywords)
        print(f"Time taken to download images: {time.perf_counter() - now}")

        print(extracted_keywords)

        now = time.perf_counter()
        gtts_multithreading(summary_sentences)
        print(f"Time taken to convert text to speech: {time.perf_counter() - now}")

        now = time.perf_counter()
        create_video_from_image_audio_multiprocessing(len(summary_sentences), extracted_keywords)
        print(f"Time taken to create videos: {time.perf_counter() - now}")

        os.chdir('..')

        final_video_file = respective_chunk_dir + '/' + str(summary_id) + '.mp4'
        concatenate_videos(respective_chunk_dir, len(summary_sentences), final_video_file)
        final_videos.append(final_video_file)

    print('Concatenating final videos!!')

    if len(final_videos) > 1:
        concatenate_final_videos(final_videos, id + ".mp4")
    else:
        os.rename(final_videos[0], id + ".mp4")

    return final_summary
