/* eslint-disable @typescript-eslint/naming-convention */
import { API_URL } from "src/constants/API_URL";
import fetch from "unfetch";

// import type { BroadcastListType } from "../types/index";

export const handlePutBroadcast = (url: string, body: any, token: string): Promise<number> => {
  return fetch(`${API_URL}${url}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...body }),
  }).then((res) => res.status);
};
