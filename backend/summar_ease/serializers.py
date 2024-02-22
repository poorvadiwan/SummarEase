from rest_framework.serializers import ModelSerializer
from .models import SummarEase
from django.db import models
from django.dispatch import receiver


class SummarEaseSerializer(ModelSerializer):
    class Meta:
        model = SummarEase
        fields = "__all__"
        extra_kwargs = {"id": {"read_only": True},
                        "name": {"required": False},
                        "document": {"required": True},
                        "summary": {"required": False},
                        "video": {"required": False},
                        "created_at": {"required": False},
                        }

    # @receiver(models.signals.post_delete, sender=SummarEase)
    # def remove_file_from_s3(sender, instance, **kwargs):
    #     instance.document.delete(save=False)
    #     instance.video.delete(save=False)

