const HOSTNAME = "https://ap-south-1.aws.neurelo.com/rest";

export const getAllSummaries = async (): Promise<any> => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/v1/summarize/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // Add any additional headers as needed
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// export const getAllTrendies = async (): Promise<Response> => {
//   const response = await fetch(
//     `https://ap-south-1.aws.neurelo.com/rest/Trends?order_by=%5B%0A++%7B%0A++++%22views%22%3A+%22desc%22%0A++%7D%0A%5D`,
//     {
//       method: "GET",
//       headers: {
//         "X-API-KEY": process.env.REACT_APP_NEURELO_ACCESS_TOKEN as string,
//       },
//     }
//   );

//   if (!response.ok) {
//     throw new Error(`Failed to fetch data: ${response.statusText}`);
//   }

//   return await response.json();
// };

export async function sendPDF(pdf: File, email: string): Promise<Response> {
  const url = "http://127.0.0.1:8000/api/v1/summarize/";
  const formData = new FormData();
  formData.append("document", pdf);
  formData.append("email", email);

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
