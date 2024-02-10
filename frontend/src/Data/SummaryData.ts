const HOSTNAME = "https://ap-south-1.aws.neurelo.com/rest";

export const getAllSummaries = async (): Promise<Response> => {
  const response = await fetch(`https://ap-south-1.aws.neurelo.com/rest/Dev`, {
    method: "GET",
    headers: {
      "X-API-KEY": process.env.REACT_APP_NEURELO_ACCESS_TOKEN as string,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }

  return await response.json();
};

export const getAllTrendies = async (): Promise<Response> => {
  const response = await fetch(
    `https://ap-south-1.aws.neurelo.com/rest/Trends?order_by=%5B%0A++%7B%0A++++%22views%22%3A+%22desc%22%0A++%7D%0A%5D`,
    {
      method: "GET",
      headers: {
        "X-API-KEY": process.env.REACT_APP_NEURELO_ACCESS_TOKEN as string,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }

  return await response.json();
};
