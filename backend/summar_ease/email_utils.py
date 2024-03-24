import re
from django.conf import settings
from django.core.mail import send_mail


def send_email(email, link):
    subject = 'Your requested document has been processed!'
    message = f'Here is your SummarEase video link: {link}'
    email_from = settings.EMAIL_HOST_USER
    recipient_list = [email]

    try:
        send_mail(subject, message, email_from, recipient_list, fail_silently=False)
    except Exception as e:
        print(e)
        return False

    return True


def check_email(email):
    regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b'

    if(re.fullmatch(regex, email)):
        return True
    else:
        return False
