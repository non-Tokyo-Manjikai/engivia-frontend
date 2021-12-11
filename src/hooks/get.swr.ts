/* eslint-disable @typescript-eslint/naming-convention */
import { parseCookies } from "nookies";
import { API_URL } from "src/constants/API_URL";
import useSWR from "swr";
import fetch from "unfetch";

const fetcher = (url: string) => {
  // Cookieを読み込む
  const cookies = parseCookies();
  return fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${cookies.token}`,
    },
  }).then((res) => {
    if (res.status >= 400) throw new Error(`status: ${res.status}`);
    return res.json();
  });
};

export const useGetSWR = <T>(params: { url: string; shouldFetch: boolean }) => {
  const { data, error, isValidating } = useSWR<T>(params.shouldFetch ? `${API_URL}${params.url}` : null, fetcher, {
    revalidateOnFocus: false,
  });

  return {
    data,
    error,
    isValidating,
  };
};
