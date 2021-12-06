/* eslint-disable @typescript-eslint/naming-convention */
import { API_URL } from "src/constants/API_URL";
import type { BroadcastLiveType } from "src/types";
import useSWR from "swr";
import fetch from "unfetch";

export const useGetUserToken = (url: string, code: string) => {
  const fetchToken = () => {
    return fetch(url, {
      method: "GET",
      body: code,
    }).then((res) => res.json());
  };

  const { data, error } = useSWR<BroadcastLiveType>([`${API_URL}${url}`], fetchToken, {
    fallbackData: {} as BroadcastLiveType,
  });

  return {
    data,
    isError: error,
    isLoading: !error && !data,
    isEmpty: data && data === undefined,
  };
};
