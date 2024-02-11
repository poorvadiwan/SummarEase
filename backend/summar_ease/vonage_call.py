import vonage
import os


VONAGE_API_KEY = os.environ.get("VONAGE_API_KEY")
VONAGE_API_SECRET = os.environ.get("VONAGE_API_SECRET")

def send_sms(link: str):
    client = vonage.Client(key=VONAGE_API_KEY, secret=VONAGE_API_SECRET)
    sms = vonage.Sms(client)

    responseData = sms.send_message(
        {
            "from": "SummarEase",
            "to": "917000043797",
            "text": "Here is the link to your summarised video: " + link,
        }
    )

    if responseData["messages"][0]["status"] == "0":
        return 0
    else:
        return 1