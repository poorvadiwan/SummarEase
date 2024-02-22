import boto3
import os
import uuid
from .serializers import SummarEaseSerializer
from .logic import video_gen
from .models import SummarEase
from django.conf import settings
from rest_framework.generics import GenericAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.mixins import CreateModelMixin, ListModelMixin, DestroyModelMixin
from PyPDF2 import PdfReader
from moviepy.editor import VideoFileClip


class SummarEaseView(GenericAPIView, CreateModelMixin, ListModelMixin):

    queryset = SummarEase.objects.all()
    serializer_class = SummarEaseSerializer

    def upload_video_to_s3(self, video_location):
        s3_client = boto3.client('s3')
        object_name = 'videos/' + os.path.basename(video_location)
        bucket = settings.AWS_STORAGE_BUCKET_NAME

        s3_client.upload_file(video_location, 'summar-ease', object_name)

        video_url = f'{object_name}'

        return video_url


    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


    def post(self, request):
        serializer = SummarEaseSerializer(data=request.data)

        if serializer.is_valid():
            uploaded_document = serializer.validated_data.pop('document')

            id = uuid.uuid4()
            file_path = os.path.join(settings.BASE_DIR, 'files')

            # Creating the 'files' folder if not exists
            if not os.path.exists(file_path):
                print('Creating the files folder!!')
                os.mkdir(file_path)

            destination_path = os.path.join(file_path, str(id))

            os.mkdir(destination_path)

            document_location = destination_path + '/' + uploaded_document.name

            # PDF saved locally
            with open(document_location, 'wb') as destination:
                for chunk in uploaded_document.chunks():
                    destination.write(chunk)
            print("PDF saved locally!!")

            os.chdir(destination_path)

            summary: list = video_gen(document_location, str(id))
            summary = '. '.join(summary)

            video_location = destination_path + '/' + str(id) + '.mp4'
            video_url = self.upload_video_to_s3(video_location)
            print("Video uploaded to S3!!")
            print(video_url)

            data = SummarEase(
                id=id,
                name=uploaded_document.name,
                summary=summary,
                document=uploaded_document,
                video=str(id)+'.mp4',
                )
            data.save()

            serializer = SummarEaseSerializer(data)

            return Response(data={'message': serializer.data}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=400)


class SummarEaseDetailView(APIView):
    def delete(self, request, id):
        try:
            summar_ease = SummarEase.objects.get(id=id)
            s3_client = boto3.client('s3')
            print(summar_ease.video.url[summar_ease.video.url.index('videos'):])

            response = s3_client.delete_objects(
            Bucket='summar-ease',
            Delete={
                'Objects': [
                    {
                        'Key': summar_ease.video.url[summar_ease.video.url.index('videos'):],
                    },
                    {
                        'Key': summar_ease.document.url[summar_ease.document.url.index('documents'):],
                    }
                ],
            },
            ExpectedBucketOwner='954830862269',
            )
            print(response)
            exit()
            summar_ease.delete()

            return Response(data={'message': 'Data deleted!!'}, status=status.HTTP_204_NO_CONTENT)
        except SummarEase.DoesNotExist:
            return Response(data={'message': 'Data not found!!'}, status=status.HTTP_404_NOT_FOUND)
