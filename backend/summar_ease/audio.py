import pyttsx3
from gtts import gTTS


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


def text_to_speech(text, audio_file):
    speech = gTTS(text, lang='en', slow=False)
    speech.save(audio_file)