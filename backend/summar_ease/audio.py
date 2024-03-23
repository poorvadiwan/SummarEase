import pyttsx3
from gtts import gTTS
from concurrent.futures import ThreadPoolExecutor
from multiprocessing import Manager



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
        self.engine.save_to_file(text=text, filename=file_name)
        self.engine.runAndWait()


def create_audio_from_sentence(sentence, output_file):
    tts = TextToSpeech(rate=158, volume=1.0)
    tts.speak(text=sentence, save=True, file_name=output_file)


def text_to_speech(text, audio_file):
    speech = gTTS(text, lang='en', slow=False)
    speech.save(audio_file)


def gtts_multithreading(summary_sentences: list):
    with ThreadPoolExecutor(max_workers=15) as executor:
        for i, text in enumerate(summary_sentences):
            executor.submit(text_to_speech, text, f'{i}.mp3')
