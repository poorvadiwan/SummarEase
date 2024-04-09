import nltk
from django.apps import AppConfig


class SummarEaseConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'summar_ease'

    def ready(self) -> None:
        nltk.download('punkt')
        return super().ready()
