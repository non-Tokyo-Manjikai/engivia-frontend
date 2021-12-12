/* eslint-disable react/jsx-handler-names */
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRecoilValue } from "recoil";
import { userInfoState } from "src/components/atoms";
import { Button, Input, PageRoot, Title } from "src/components/styled";
import { postBroadcast } from "src/hooks/postBroadcast";
import type { BroadcastPostBodyType } from "src/types/BroadcastPostBodyType";
import { styled } from "src/utils";

const BroadcastInputPage: NextPage = () => {
  const userInfo = useRecoilValue(userInfoState);
  const router = useRouter();
  const [broadcastState, setBroadcastState] = useState<BroadcastPostBodyType>({
    title: "",
    scheduledStartTime: "",
  });
  const [buttonDisabledState, setButtonDisabledState] = useState(false);

  const handleSaveClick = async () => {
    // タイトル、放送日を指定しないと作成できないようにする。空白文字列も作成できない。
    if (!broadcastState.title || !broadcastState.scheduledStartTime || !/\S/g.test(broadcastState.title)) {
      toast.error("タイトルと放送日を指定してください");
      return;
    }
    // 連続クリックで重複して送信しないようにする
    setButtonDisabledState(true);
    const toastId = toast.loading("Sending...");
    const statusCode = await postBroadcast("/broadcast", broadcastState, userInfo.token);
    if (statusCode >= 400) {
      toast.error(`error: ${statusCode}`, { id: toastId });
      setButtonDisabledState(false);
    } else {
      toast.success("保存成功しました", { id: toastId });
      // トーストを表示した2秒後にページ遷移する
      setTimeout(() => router.push("/broadcast"), 2000);
    }
  };
  console.log(`test: ${/\S/g.test(broadcastState.title)}`);

  return (
    <PageRoot>
      <Title>放送を作成</Title>
      <Input
        type="text"
        placeholder="タイトルを入力する"
        // eslint-disable-next-line react/jsx-handler-names
        onChange={(e) => setBroadcastState({ ...broadcastState, title: e.target.value })}
      />
      <Input
        type="date"
        placeholder="2021/09/03"
        onChange={(e) =>
          setBroadcastState({ ...broadcastState, scheduledStartTime: `${e.target.value}T00:00:00+09:00` })
        }
      />
      <ButtonWrap>
        <Button color="primary" disabled={buttonDisabledState} onClick={handleSaveClick}>
          保存する
        </Button>
        <Button color="secondary" disabled={buttonDisabledState} onClick={() => router.push("/broadcast")}>
          キャンセル
        </Button>
      </ButtonWrap>
      <Toaster />
    </PageRoot>
  );
};

// eslint-disable-next-line import/no-default-export
export default BroadcastInputPage;

const ButtonWrap = styled("div", {
  display: "flex",
  justifyContent: "center",
  gap: "2rem",
});
