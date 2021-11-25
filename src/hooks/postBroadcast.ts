import { API_URL } from "src/constants/API_URL";
import fetch from "unfetch";

export const postBroadcast = (url: string, body: any, token: string) => {
  return fetch(`${API_URL}${url}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...body }),
  }).then((res) => res.status);
};
