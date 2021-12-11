/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from "next/router";
import type { ChangeEvent, VFC } from "react";
import { useCallback, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRecoilValue } from "recoil";
import { userInfoState } from "src/components/atoms";
import { Button, PageRoot, Textarea } from "src/components/styled";
import { requestFetcher } from "src/functions/requestFetcher";

export const MyEngiviaInput: VFC = () => {
  const router = useRouter();
  const userInfo = useRecoilValue(userInfoState);
  const [text, setText] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleOnChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  }, []);

  const handlePostEngivia = async () => {
    if (!text || !/\S/g.test(text)) {
      toast.error("エンジビアを入力してください");
      return;
    }

    const toastId = toast.loading("Sending...");
    setIsButtonDisabled(true);

    const PostBody = { content: text, broadcastId: router.query.broadcastId };
    const { statusCode } = await requestFetcher("/trivia", PostBody, "POST", userInfo.token);

    if (statusCode >= 400) {
      toast.error("保存できませんでした", { id: toastId });
      setIsButtonDisabled(false);
      return;
    }

    toast.success("保存成功しました", { id: toastId });
    setTimeout(() => router.push("/broadcast"), 2000);
  };

  return (
    <PageRoot>
      <Textarea placeholder="エンビジアを入力する" value={text} onChange={handleOnChange} />

      <Button color="primary" onClick={handlePostEngivia} disabled={isButtonDisabled}>
        保存する
      </Button>

      <Toaster />
    </PageRoot>
  );
};
