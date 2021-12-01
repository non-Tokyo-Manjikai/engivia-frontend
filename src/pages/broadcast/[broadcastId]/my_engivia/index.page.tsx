import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { BroadcastHeader, EngiviaCard } from "src/components";
import { broadcastLiveState, userInfoState } from "src/components/atoms";
import { MyEngiviaInput } from "src/components/MyEngiviaInput";
import { Button, PageRoot } from "src/components/styled";
import { useGetEngiviaInfo } from "src/hooks/useGetEngiviaInfo";
import { styled } from "src/utils";

const ButtonWrap = styled("div", {
  display: "flex",
  justifyContent: "center",
  gap: "2rem",
});

const MyEngiviaPage: NextPage = () => {
  const router = useRouter();
  const { broadcastId } = router.query;
  const userInfo = useRecoilValue(userInfoState);
  const broadcastLive = useRecoilValue(broadcastLiveState);
  useGetEngiviaInfo(`/broadcast/${broadcastId}`, userInfo.token);

  if (!broadcastLive) return null;

  return (
    <PageRoot>
      {broadcastLive.Trivia?.length !== 0 ? (
        <>
          <BroadcastHeader status="upcoming" title={`第${broadcastId}回エンジビアの泉`} />
          <EngiviaCard
            id={broadcastLive.id}
            content={broadcastLive.Trivia[0].content}
            name={broadcastLive.Trivia[0].User.name}
          />
          <ButtonWrap>
            <Button color="primary">編集する</Button>
            <Button color="secondary">削除する</Button>
          </ButtonWrap>
        </>
      ) : (
        <MyEngiviaInput token={userInfo.token} />
      )}
    </PageRoot>
  );
};
// eslint-disable-next-line import/no-default-export
export default MyEngiviaPage;
