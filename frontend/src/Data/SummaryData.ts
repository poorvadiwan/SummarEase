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
