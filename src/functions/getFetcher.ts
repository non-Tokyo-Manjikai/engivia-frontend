import { API_URL } from "src/constants/API_URL";
import fetch from "unfetch";

export const getFetcher = async (url: string) => {
  console.info(" ");
  console.info("getFetcher     | ---------------------------");
  console.info(`request method | GET`);
  console.info(`endpoint       | ${API_URL}${url}`);
  console.info(" ");

  const result = await fetch(`${API_URL}${url}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((err) => err);

  return result;
};

export const getFetcherWithToken = async (url: string, token: string) => {
  console.info(" ");
  console.info("getFetcherWithToken | ---------------------------");
  console.info(`request method      | GET`);
  console.info(`endpoint            | ${API_URL}${url}`);
  console.info(`Bearer token        | ${token}`);
  console.info(" ");

  const result = await fetch(`${API_URL}${url}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((err) => err);

  return result;
};
