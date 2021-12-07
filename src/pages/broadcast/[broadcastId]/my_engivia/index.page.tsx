import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { useRecoilValue } from "recoil";
import { BroadcastHeader, EngiviaCard } from "src/components";
import { userInfoState } from "src/components/atoms";
import { MyEngiviaInput } from "src/components/MyEngiviaInput";
import { Button, PageRoot, Textarea } from "src/components/styled";
import { deleteTrivia } from "src/hooks/deleteTrivia";
import { useGetEngiviaInfo } from "src/hooks/useGetEngiviaInfo";
import { styled } from "src/utils";

const MyEngiviaPage: NextPage = () => {
  const router = useRouter();
  const { broadcastId } = router.query;
  const userInfo = useRecoilValue(userInfoState);
  const { data, isError, isLoading } = useGetEngiviaInfo(`/broadcast/${broadcastId}`, userInfo.token);
  const [edit, setEdit] = useState(false);

  const handleEditToggle = useCallback(() => {
    setEdit((edit) => !edit);
  }, []);

  const url = `/trivia/:${broadcastId}`;
  const handleDelete = () => {
    deleteTrivia(url, userInfo.token);
  };

  if (!broadcastId) return null;

  return (
    <PageRoot>
      <BroadcastHeader status="upcoming" title={data?.title} />

      {isLoading ? (
        <div>loading</div>
      ) : isError ? (
        <div>error</div>
      ) : !data?.id ? (
        <div>no data</div>
      ) : data.Trivia?.length !== 0 ? (
        <>
          {edit ? (
            <>
              <Textarea value={data.Trivia[0].content} />
              <ButtonWrap>
                <Button color="primary" onClick={handleEditToggle}>
                  保存する
                </Button>
                <Button color="secondary" onClick={handleEditToggle}>
                  キャンセル
                </Button>
              </ButtonWrap>
            </>
          ) : (
            <>
              <EngiviaCard id={data.id} content={data.Trivia[0].content} name={data.Trivia[0].User.name} />
              <ButtonWrap>
                <Button color="primary" onClick={handleEditToggle}>
                  編集する
                </Button>
                <Button color="secondary" onClick={handleDelete}>
                  削除する
                </Button>
              </ButtonWrap>
            </>
          )}
        </>
      ) : (
        <MyEngiviaInput token={userInfo.token} />
      )}
    </PageRoot>
  );
};
// eslint-disable-next-line import/no-default-export
export default MyEngiviaPage;

const ButtonWrap = styled("div", {
  display: "flex",
  justifyContent: "center",
  gap: "2rem",
});
