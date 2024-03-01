from PyPDF2 import PdfReader
from tempfile import NamedTemporaryFile

import os


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
