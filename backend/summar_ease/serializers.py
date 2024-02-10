from rest_framework.serializers import ModelSerializer
from .models import SummarEase


class SummarEaseSerializer(ModelSerializer):
    class Meta:
        model = SummarEase
        fields = ['document']
