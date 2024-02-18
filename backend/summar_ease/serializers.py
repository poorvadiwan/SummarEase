from rest_framework.serializers import ModelSerializer
from .models import SummarEase


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
