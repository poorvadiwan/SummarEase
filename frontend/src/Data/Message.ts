export const sendWMessage = async () => {
  try {
    const response = await fetch(
      "https://messages-sandbox.nexmo.com/v1/messages",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization:
            "Basic " +
            Buffer.from(process.env.REACT_APP_VONAGE_KEY as string).toString(
              "base64"
            ),
        },
        body: JSON.stringify({
          from: "917987744456",
          to: "917987744456",
          message_type: "text",
          text: "This is a WhatsApp Message sent from the Messages API",
          channel: "whatsapp",
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};
