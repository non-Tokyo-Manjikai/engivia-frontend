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
import toast, { Toaster } from "react-hot-toast";

const MyEngiviaPage: NextPage = () => {
  const router = useRouter();
  const { broadcastId } = router.query;
  const userInfo = useRecoilValue(userInfoState);
  const [edit, setEdit] = useState(false);
  const { data, isError, isLoading } = useGetEngiviaInfo(`/broadcast/${broadcastId}`, userInfo.token);

  const handleEditToggle = useCallback(() => {
    setEdit((edit) => !edit);
  }, []);

  useCallback(() => {}, []);

  const handleDelete = (triviaId: number) => async () => {
    const statusCode = await deleteTrivia(`/trivia/${triviaId}`, userInfo.token);
    console.log(statusCode);
    if (statusCode >= 400) {
      toast.error("削除できませんでした");
    } else {
      toast.success("削除しました");
      setTimeout(() => router.push("/broadcast"), 2000);
    }
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
                <Toaster />
                <Button color="primary" onClick={handleEditToggle}>
                  編集する
                </Button>
                <Button color="secondary" onClick={handleDelete(data?.Trivia[0]?.id)}>
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
