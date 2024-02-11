export async function sendSMS(link: string): Promise<Response> {
  const url = "http://127.0.0.1:8000/api/v1/summarize/sms/";
  const formData = new FormData();
  formData.append("link", link);

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      return response.json();
    } else {
      console.error(
        "Failed to process file:",
        response.status,
        response.statusText
      );
      throw new Error(
        `Failed to process file: ${response.status} ${response.statusText}`
      );
    }
  } catch (error: any) {
    console.error("Failed to fetch data:", error.message);
    throw new Error(`Failed to fetch data: ${error.message}`);
  }
}
