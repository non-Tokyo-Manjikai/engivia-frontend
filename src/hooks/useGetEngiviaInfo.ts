/* eslint-disable @typescript-eslint/naming-convention */
import { API_URL } from "src/constants/API_URL";
import type { BroadcastLiveType } from "src/types";
import useSWR from "swr";
import fetch from "unfetch";

const fetchWithToken = (url: string, token: string) => {
  return fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

export const useGetEngiviaInfo = (url: string, token: string) => {
  const { data, error } = useSWR<BroadcastLiveType>([`${API_URL}${url}`, token], fetchWithToken, {
    fallbackData: {} as BroadcastLiveType,
  });

  return {
    data,
    isError: error,
    isLoading: !error && !data,
    isEmpty: data && data === undefined,
  };
};
