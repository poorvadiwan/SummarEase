from django.db import models
import uuid
from backend.storage_backend import PublicVideoStorage, PublicDocumentStorage

class SummarEase(models.Model):
    id = models.UUIDField(verbose_name='ID', primary_key=True, default=uuid.uuid4, editable=False, auto_created=False)
    name = models.CharField(verbose_name='Name', max_length=100)
    summary = models.TextField(verbose_name='Summary')
    video = models.FileField(verbose_name='Video URL', storage=PublicVideoStorage())
    document = models.FileField(verbose_name='Document URL', storage=PublicDocumentStorage())
    created_at = models.DateTimeField(verbose_name='Created At', auto_now_add=True)
