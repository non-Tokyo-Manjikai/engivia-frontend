import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { broadcastLiveState } from "src/components/atoms";
import { useGetSWRWithToken } from "src/hooks/useGetSWR";
import type { BroadcastLive } from "type";

export const useGetEngiviaInfo = (url: string, token: string) => {
  const { data, isError, isLoading } = useGetSWRWithToken<BroadcastLive>(url, token);

  const setBroadcast = useSetRecoilState(broadcastLiveState);

  useEffect(() => {
    if (data) {
      const numberAddTriviaList = data.Trivia?.map((item, index) => {
        return {
          ...item,
          engiviaNumber: index + 1,
        };
      });
      // eslint-disable-next-line @typescript-eslint/naming-convention
      setBroadcast({ ...data, Trivia: numberAddTriviaList });
    }
  }, [data]);

  return {
    data: data,
    isError: isError,
    isLoading: isLoading,
  };
};
