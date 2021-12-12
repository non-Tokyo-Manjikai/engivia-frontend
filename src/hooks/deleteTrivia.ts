import { API_URL } from "src/constants/API_URL";
import fetch from "unfetch";

export const deleteTrivia = (url: string, token: string) => {
  return fetch(`${API_URL}${url}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.status);
};
