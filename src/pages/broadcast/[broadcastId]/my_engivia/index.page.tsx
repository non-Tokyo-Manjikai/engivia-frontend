import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRecoilValue } from "recoil";
import { BroadcastHeader, EngiviaCard } from "src/components";
import { userInfoState } from "src/components/atoms";
import { MyEngiviaInput } from "src/components/MyEngiviaInput";
import { Button, PageRoot, Textarea } from "src/components/styled";
import { deleteTrivia } from "src/hooks/deleteTrivia";
import { handlePutTrivia } from "src/hooks/handlePutTrivia";
import { useGetEngiviaInfo } from "src/hooks/useGetEngiviaInfo";
import { useGetTrivia } from "src/hooks/useGetTrivia";
import { styled } from "src/utils";

const MyEngiviaPage: NextPage = () => {
  const router = useRouter();
  const { broadcastId } = router.query;
  const userInfo = useRecoilValue(userInfoState);
  const { data, isError, isLoading } = useGetEngiviaInfo(`/broadcast/${broadcastId}`, userInfo.token);
  const {
    data: trivia,
    isError: triviaError,
    isLoading: triviaIsLoading,
  } = useGetTrivia(`/trivia?broadcastId=${broadcastId}`, userInfo.token);

  const [edit, setEdit] = useState(false);
  const [text, setText] = useState<string>("");
  const [buttonDisabledState, setButtonDisabledState] = useState(false);

  const handleEditToggle = useCallback(() => {
    setEdit((edit) => !edit);
    if (trivia) {
      setText(trivia.content);
    }
  }, [trivia]);

  useEffect(() => {
    if (trivia) {
      setText(trivia.content);
    }
  }, [trivia]);

  const handleTextChange = (e: any) => {
    setText(e.target.value);
  };

  const handleEditEngivia = async () => {
    if (!text || !/\S/g.test(text)) {
      toast.error("エンジビアを入力してください");
      return;
    }
    setButtonDisabledState(true);
    const toastId = toast.loading("Sending...");
    const body = {
      content: text,
      token: userInfo.token,
    };
    const statusCode = await handlePutTrivia(`/trivia/${trivia?.id}`, body, body.token);
    if (statusCode >= 400) {
      toast.error("保存できませんでした", { id: toastId });
      setButtonDisabledState(false);
    } else {
      toast.success("保存成功しました", { id: toastId });
      setTimeout(() => router.push("/broadcast"), 2000);
    }
  };
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
      <BroadcastHeader status={data?.status} title={data?.title} />

      {isLoading || triviaIsLoading ? (
        <div>loading</div>
      ) : isError || triviaError ? (
        <div>error</div>
      ) : !data?.id ? (
        <div>no data</div>
      ) : data?.Trivia[0]?.content ? (
        <>
          {edit ? (
            <>
              <Textarea value={text} onChange={handleTextChange} />
              <ButtonWrap>
                <Button color="primary" onClick={handleEditEngivia} disabled={buttonDisabledState}>
                  保存する
                </Button>
                <Button color="secondary" onClick={handleEditToggle}>
                  キャンセル
                </Button>
              </ButtonWrap>
              <Toaster />
            </>
          ) : (
            <>
              <EngiviaCard
                id={data.id}
                image={userInfo.image}
                content={data.Trivia[0].content}
                name={data.Trivia[0].User.name}
              />
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
