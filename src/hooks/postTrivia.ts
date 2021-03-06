/* eslint-disable @typescript-eslint/naming-convention */
// import axios from "axios";
import { API_URL } from "src/constants/API_URL";
import fetch from "unfetch";

export const postTrivia = (url: string, body: any, token: string) => {
  return fetch(`${API_URL}${url}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...body }),
  }).then((res) => res.status);
};

/* 使えるか確認してない */
// axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
// export const handlePutTriviaAxios = async (url: string, body: any, token: string) => {
//   return await axios
//     .put(`${API_URL}${url}`, {
//       body,
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     })
//     .then((res) => res.data);
// };
