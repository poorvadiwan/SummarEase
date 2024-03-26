# pull official base image
FROM python:3.12.2-bullseye

# set work directory
WORKDIR /usr/src/backend

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apt update
RUN apt install libxml2-dev libxslt-dev netcat -y

# install dependencies
RUN pip install --upgrade pip
COPY ./requirements.txt .
RUN pip install -r requirements.txt

# COPY ./entrypoint.sh .
# RUN sed -i 's/\r$//g' /usr/src/backend/entrypoint.sh
# RUN chmod +x /usr/src/backend/entrypoint.sh

# copy project
COPY . .

# ENTRYPOINT ["/usr/src/backend/entrypoint.sh"]
