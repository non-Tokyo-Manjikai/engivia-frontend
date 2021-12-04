import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { API_URL } from "src/constants/API_URL";
import type { BroadcastLiveType } from "src/types";
import useSWRImmutable from "swr/immutable";
import fetch from "unfetch";
import { broadcastLiveState } from "src/components/atoms";

const fetchWithToken = (url: string, token: string) => {
  return fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

export const useGetEngiviaInfo = (url: string, token: string) => {
  const setBroadcast = useSetRecoilState(broadcastLiveState);

  const { data, error } = useSWRImmutable<BroadcastLiveType>([`${API_URL}${url}`, token], fetchWithToken);

  useEffect(() => {
    console.info(data);
    if (data) {
      const numberAddTriviaList = data.Trivia?.map((item, index) => {
        return {
          ...item,
          engiviaNumber: index + 1,
        };
      });
      setBroadcast({ ...data, Trivia: numberAddTriviaList });
    }
  }, [data]);

  return {
    data: data,
    isError: error,
    isLoading: !error && !data,
    isEmpty: data && data === undefined,
  };
};
