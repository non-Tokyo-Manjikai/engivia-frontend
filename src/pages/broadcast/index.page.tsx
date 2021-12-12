/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable indent */
import type { NextPage } from "next";
import { useRecoilValue } from "recoil";
import { BroadcastItem, NextLink } from "src/components";
import { userInfoState } from "src/components/atoms";
import { FetcherExample } from "src/components/FetcherExample";
import { Button, PageRoot, Title } from "src/components/styled";
import { useGetSWR } from "src/hooks/useGetSWR";
import { styled } from "src/utils";
import toast, { Toaster } from "react-hot-toast";

export type LiveStatus = "upcoming" | "live" | "ended";

export type BroadcastListType = {
  id: number;
  title: string;
  scheduledStartTime: string;
  status: LiveStatus;
  _count: {
    Trivia: number;
  };
};

const BroadcastPage: NextPage = () => {
  const { data, isError, isLoading } = useGetSWR<BroadcastListType[]>("/broadcast");

  const userInfo = useRecoilValue(userInfoState);

  return (
    <PageRoot>
      <Title>放送一覧</Title>
      <Toaster />

      {isLoading ? (
        "loading"
      ) : isError ? (
        "error"
      ) : !data ? (
        "no data"
      ) : (
        <BroadcastItemWrap>
          {data?.map((item) => (
            <NextLink
              href={`/broadcast/${item.id}${
                item.status === "ended"
                  ? "/archive"
                  : userInfo.isAdmin
                  ? "/live/admin"
                  : item.status === "live"
                  ? "/live/user"
                  : item.status === "upcoming"
                  ? "/my_engivia"
                  : ""
              }`}
              key={item.id}
            >
              <BroadcastItem key={item.id} {...item} />
            </NextLink>
          ))}
        </BroadcastItemWrap>
      )}

      {userInfo.isAdmin ? (
        <NextLink href={"/broadcast/input"}>
          <Button color="primary">放送を作成する</Button>
        </NextLink>
      ) : null}
    </PageRoot>
  );
};

// eslint-disable-next-line import/no-default-export
export default BroadcastPage;

const BroadcastItemWrap = styled("ul", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",

  borderRadius: 5,

  boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)",
  listStyle: "none",
});
