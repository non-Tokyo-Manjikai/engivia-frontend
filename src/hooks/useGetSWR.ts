import { getFetcher } from "src/functions/getFetcher";
import useSWR from "swr";

export const useGetSWR = <T extends unknown>(url: string) => {
  const { data, error } = useSWR<T>(url, getFetcher, { revalidateOnFocus: false });

  return {
    data: data,
    isError: error,
    isLoading: !error && !data,
  };
};

export const useGetSWRWithToken = <T extends unknown>(url: string, token: string) => {
  const { data, error } = useSWR<T>([url, token], { revalidateOnFocus: false });

  return {
    data: data,
    isError: error,
    isLoading: !error && !data,
  };
};
