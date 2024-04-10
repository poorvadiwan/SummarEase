FROM python:3.12.2-bullseye

RUN mkdir -p /home/backend/django
WORKDIR /home/backend/django

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apt-get update && \
    apt-get install -y --no-install-recommends gcc libxml2-dev libxslt-dev netcat -y

COPY ./requirements.txt ./

RUN pip install -r requirements.txt

RUN mkdir -p /var/log/gunicorn
RUN mkdir -p /var/log/django

RUN mkdir -p /tmp/shm
RUN mkdir /home/backend/django/staticfiles

COPY . /home/backend/django/

RUN mkdir -p /home/backend/nltk_data
RUN chown -R root:root /home/backend/nltk_data
RUN chown -R root:root /home/backend/django

CMD [ "gunicorn", "backend.wsgi:application", "-c", "./backend/gunicorn_conf.py"]
