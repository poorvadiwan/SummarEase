import json
from .serializers import SummarEaseSerializer
from rest_framework.views import APIView
import requests
from rest_framework.response import Response
from PyPDF2 import PdfReader
from .logic import video_gen
import boto3
import os
from tempfile import NamedTemporaryFile
import uuid


NEURELO_KEY = os.environ.get('NEURELO_KEY')

class SummarEaseView(APIView):


    def get(self, request):
        url = "https://ap-south-1.aws.neurelo.com/rest/Dev?"
        headers = {
            "X-API-KEY": f"{NEURELO_KEY}"
        }

        response = requests.get(url, headers=headers)
        return Response(response.json())


    # def post(self, request):
    #     serializer = SummarEaseSerializer(data=request.data)
    #     if serializer.is_valid():
    #         pdf = request.FILES['document']
    #         summary: list = video_gen(pdf)
    #         summary = summary.join(' ')
    #     return Response(serializer.errors, status=400)


    def post(self, request):
        serializer = SummarEaseSerializer(data=request.data)
        if serializer.is_valid():
            pdf = request.FILES['document']

            if not os.path.exists('./files'):
                os.mkdir('./files')

            destination_path = os.path.join('./files', pdf.name)
            with open(destination_path, 'wb') as destination_file:
                for chunk in pdf.chunks():
                    destination_file.write(chunk)

            print("PDF Saved!!")

            # Save the PDF file to S3 bucket
            s3 = boto3.client('s3')
            bucket_name = 'summar-ease'
            s3.upload_fileobj(pdf, bucket_name, f"documents/{pdf.name}")

            document = "https://summar-ease.s3.amazonaws.com/documents/" + pdf.name.replace(' ', '+')

            print("PDF Uploaded to S3!!")

            id = uuid.uuid4()

            summary: list = video_gen('./files/' + pdf.name, str(id))
            summary = '. '.join(summary)
            file_name = str(id) + '.mp4'

            with open(file_name, 'rb') as data:
                s3.upload_fileobj(data, bucket_name, f"videos/{str(id)+'.mp4'}")

            print("Image file Uploaded to S3!!")

            video = "https://summar-ease.s3.amazonaws.com/videos/" + file_name

            url = "https://ap-south-1.aws.neurelo.com/rest/Dev/__one?"
            headers = {
                "X-API-KEY": f"{NEURELO_KEY}"
            }
            data = {
                "name": pdf.name,
                "document": document,
                "summary": summary,
                "video": video
            }
            print(data)

            response = requests.post(url, headers=headers, json=data)
            print(response)
            print(response.text)
            return Response(response.json())

        return Response(serializer.errors, status=400)


