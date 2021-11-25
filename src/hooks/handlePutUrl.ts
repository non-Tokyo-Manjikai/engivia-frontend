import { API_URL } from "src/constants/API_URL";
import fetch from "unfetch";

export const handlePutUrl = (url: string, body: any, token: string) => {
  return fetch(`${API_URL}${url}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...body }),
  }).then((res) => res.json());
};
