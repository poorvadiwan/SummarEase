from langchain.text_splitter import NLTKTextSplitter
from .pdf import extract_text_from_pdf
from .summary import *
from .keyword import keywords_processor_multithreading
from .video import create_video_from_image_sentence, concatenate_videos
from .chunks import chunk_creator
import os
import time


def video_gen(pdf_file_path: str, id: str):
    print('Video generation started!!')

    final_videos = []
    final_summary = []

    extracted_text =  extract_text_from_pdf(pdf_file_path)
    chunk_list = chunk_creator(extracted_text)

    for ele in chunk_list:
        print(len(ele))

    print("Divided into chunks!!")

    time1 = time.time()
    summarized_chunks = chunks_summarizer(chunk_list)
    print(f"Time taken to summarize chunks: {(time.time() - time1)}")
    print(summarized_chunks)

    for i in range(len(chunk_list)):
        summary = summarized_chunks.get(i).get('summary')
        summary_id = summarized_chunks.get(i).get('id')
        final_summary.append(summary)
        summary_sentences = summary.split('. ')

        video_files = []

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

        os.chdir('..')

        final_video_file = respective_chunk_dir + '/' + str(summary_id) + '.mp4'
        final_videos.append(final_video_file)
        concatenate_videos(video_files, final_video_file)

        for file in video_files:
            os.remove(file)

    print('Concatenating final videos!!')

    if len(final_videos) > 1:
        concatenate_videos(final_videos, id + ".mp4")
    else:
        os.rename(final_videos[0], id + ".mp4")

    return final_summary
