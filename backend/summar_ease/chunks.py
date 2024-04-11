from math import floor
from langchain.text_splitter import NLTKTextSplitter


def chunk_size_limit_calculator(total_character_count: int) -> int:
    upper_limit = 100000

    if (total_character_count > upper_limit):
        return total_character_count/((total_character_count/upper_limit) + 1)

    return total_character_count/((total_character_count/20000) + 1)


def chunk_size_specifier(number_of_characters: int):
    chunk_size_limit = chunk_size_limit_calculator(number_of_characters)

    if number_of_characters > chunk_size_limit:
        return floor((number_of_characters/((number_of_characters//chunk_size_limit)+1)) + 800)

    return number_of_characters


def chunk_creator(extracted_text: str) -> list:
    number_of_characters = len(extracted_text)
    chunk_size = chunk_size_specifier(number_of_characters)

    print('Characters = ', number_of_characters)
    print('Chunk_size = ', chunk_size)

    if number_of_characters == chunk_size:
        return [extracted_text]

    text_splitter = NLTKTextSplitter(chunk_size=chunk_size)
    chunk_list = text_splitter.split_text(extracted_text)

    return chunk_list
