import type { NextPage } from "next";
import { useRouter } from "next/router";
import type { ChangeEvent, VFC } from "react";
import { useCallback, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRecoilValue } from "recoil";
import { BroadcastHeader, EngiviaCard } from "src/components";
import { userInfoState } from "src/components/atoms";
import { MyEngiviaInput } from "src/components/MyEngiviaInput";
import { Button, PageRoot, Textarea } from "src/components/styled";
import { requestFetcher } from "src/functions/requestFetcher";
import { useGetSWRWithToken } from "src/hooks/useGetSWR";
import type { BroadcastLive, Trivia } from "src/types";
import { styled } from "src/utils";

const MyEngiviaPage: NextPage = () => {
  const router = useRouter();
  const { broadcastId } = router.query;
  const userInfo = useRecoilValue(userInfoState);
  const [text, setText] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [isButtonDisabled, setisButtonDisabled] = useState(false);

  const {
    data: broadcastData,
    isError: broadcastIsError,
    isLoading: broadcastIsLoading,
  } = useGetSWRWithToken<BroadcastLive>(`/broadcast/${broadcastId}`, userInfo.token);
  const {
    data: triviaData,
    isError: triviaIsError,
    isLoading: triviaIsLoading,
  } = useGetSWRWithToken<Trivia>(`/trivia?broadcastId=${broadcastId}`, userInfo.token);

  const handleEditToggle = useCallback(() => {
    setIsEdit((prevState) => !prevState);
    if (triviaData) setText(triviaData.content);
  }, [triviaData]);

  const handleTextChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  }, []);

  const handlePutEngivia = async () => {
    if (!text || !/\S/g.test(text)) {
      toast.error("エンジビアを入力してください");
      return;
    }

    const toastId = toast.loading("Sending...");
    setisButtonDisabled(true);

    const PutBody = { content: text };
    const { statusCode } = await requestFetcher(`/trivia/${triviaData?.id}`, PutBody, "PUT", userInfo.token);

    if (statusCode >= 400) {
      toast.error("保存できませんでした", { id: toastId });
      setisButtonDisabled(false);
      return;
    }

    toast.success("保存成功しました", { id: toastId });
    setTimeout(() => router.push("/broadcast"), 2000);
  };

  const handleDelete = (triviaId: number) => async () => {
    const toastId = toast.loading("Sending...");

    const { statusCode } = await requestFetcher(`/trivia/${triviaId}`, {}, "DELETE", userInfo.token);

    if (statusCode >= 400) {
      toast.error("削除できませんでした", { id: toastId });
      return;
    }

    toast.success("削除しました", { id: toastId });
    setTimeout(() => router.push("/broadcast"), 2000);
  };

  useEffect(() => {
    if (triviaData) {
      setText(triviaData.content);
    }
  }, [triviaData]);

  if (!broadcastData || !triviaData) return null;

  return (
    <PageRoot>
      <BroadcastHeader status={broadcastData.status} title={broadcastData.title} />

      {broadcastIsLoading || triviaIsLoading ? (
        <div>loading</div>
      ) : broadcastIsError || triviaIsError ? (
        <div>error</div>
      ) : !broadcastData?.id ? (
        <div>no data</div>
      ) : triviaData?.id ? (
        <>
          {isEdit ? (
            <>
              <Textarea value={text} onChange={handleTextChange} />
              <ButtonGroup
                leftLabel="保存する"
                onLeftButtonClick={handlePutEngivia}
                rightLabel="キャンセル"
                onRightButtonClick={handleEditToggle}
                disabled={isButtonDisabled}
              />
              {/* <ButtonWrap>
                <Button color="primary" onClick={handlePutEngivia} disabled={isButtonDisabled}>
                  保存する
                </Button>
                <Button color="secondary" onClick={handleEditToggle}>
                  キャンセル
                </Button>
              </ButtonWrap> */}
            </>
          ) : (
            <>
              <EngiviaCard
                id={broadcastData.id}
                content={broadcastData.Trivia[0].content}
                name={broadcastData.Trivia[0].User.name}
                image={userInfo.image}
              />
              <ButtonGroup
                leftLabel="編集する"
                onLeftButtonClick={handleEditToggle}
                rightLabel="削除する"
                onRightButtonClick={() => handleDelete(broadcastData?.Trivia[0]?.id)}
              />

              {/* <ButtonWrap>
                <Button color="primary" onClick={handleEditToggle}>
                  編集する
                </Button>
                <Button color="secondary" onClick={handleDelete(broadcastData?.Trivia[0]?.id)}>
                  削除する
                </Button>
              </ButtonWrap> */}
            </>
          )}
        </>
      ) : (
        <MyEngiviaInput />
      )}

      <Toaster />
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

type Props = {
  leftLabel: string;
  onLeftButtonClick: () => void;
  rightLabel: string;
  onRightButtonClick: () => void;
  disabled?: boolean;
};

const ButtonGroup: VFC<Props> = (props) => {
  return (
    <ButtonWrap>
      <Button color="primary" onClick={props.onLeftButtonClick} disabled={props.disabled}>
        {props.leftLabel}
      </Button>
      <Button color="secondary" onClick={props.onRightButtonClick} disabled={props.disabled}>
        {props.rightLabel}
      </Button>
    </ButtonWrap>
  );
};
