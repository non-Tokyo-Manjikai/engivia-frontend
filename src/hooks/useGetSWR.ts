import useSWRImmutable from "swr/immutable";
import { getFetcher } from "src/functions/getFetcher";

export const useGetSWR = <T extends unknown>(url: string) => {
  const { data, error } = useSWRImmutable<T>(url, getFetcher);

  return {
    data: data,
    isError: error,
    isLoading: !error && !data,
  };
};

export const useGetSWRWithToken = <T extends unknown>(url: string, token: string) => {
  const { data, error } = useSWRImmutable<T>([url, token]);

  return {
    data: data,
    isError: error,
    isLoading: !error && !data,
  };
};
