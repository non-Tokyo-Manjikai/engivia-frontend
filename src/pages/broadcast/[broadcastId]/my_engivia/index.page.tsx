import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { BroadcastHeader, EngiviaCard } from "src/components";
import { userInfoState } from "src/components/atoms";
import { MyEngiviaInput } from "src/components/MyEngiviaInput";
import { Button, PageRoot, Textarea } from "src/components/styled";
import { useGetEngiviaInfo } from "src/hooks/useGetEngiviaInfo";
import { styled } from "src/utils";

const MyEngiviaPage: NextPage = () => {
  const router = useRouter();
  const { broadcastId } = router.query;
  const userInfo = useRecoilValue(userInfoState);
  const { data, isError, isLoading } = useGetEngiviaInfo(`/broadcast/${broadcastId}`, userInfo.token);
  const [edit, setEdit] = useState(false);
  if (!broadcastId) return null;
  const handleEdit = () => {
    setEdit(true);
  };
  const handleCancel = () => {
    setEdit(false);
  };

  return (
    <PageRoot>
      <BroadcastHeader status="upcoming" title={`第${broadcastId}回エンジビアの泉`} />

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
              <Textarea placeholder={data.Trivia[0].content} />
              <ButtonWrap>
                <Button color="primary" onClick={handleEdit}>
                  保存する
                </Button>
                <Button color="secondary" onClick={handleCancel}>
                  キャンセル
                </Button>
              </ButtonWrap>
            </>
          ) : (
            <>
              <EngiviaCard id={data.id} content={data.Trivia[0].content} name={data.Trivia[0].User.name} />
              <ButtonWrap>
                <Button color="primary" onClick={handleEdit}>
                  編集する
                </Button>
                <Button color="secondary">削除する</Button>
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
