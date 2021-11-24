import { API_URL } from "src/constants/API_URL";
import type { BroadcastListType } from "src/types/BroadcastListType";
import useSWR from "swr";

export const useBroadcastList = () => {
  const { data, error } = useSWR<BroadcastListType[]>(`${API_URL}/broadcast`);

  return {
    data,
    isError: error,
    isLoading: !error && !data,
    isEmpty: data && data === undefined,
  };
};
