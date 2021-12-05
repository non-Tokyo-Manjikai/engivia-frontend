import { API_URL } from "src/constants/API_URL";
import fetch from "unfetch";

type Method = "POST" | "PUT" | "DELETE";

export const requestFetcher = async (url: string, body: unknown, method: Method, token: string) => {
  console.info(`endpoint ${API_URL}${url}`);
  console.info(`request body ${body}`);
  console.info(`request method ${method}`);
  console.info(`Bearer token ${token}`);

  const result = await fetch(`${API_URL}${url}`, {
    method: method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.status)
    .catch((err) => err);

  return result;
};
