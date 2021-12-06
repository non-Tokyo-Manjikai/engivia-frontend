/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from "next/router";
import type { ChangeEvent, VFC } from "react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Button, PageRoot, Textarea } from "src/components/styled";
import { postTrivia } from "src/hooks/postTrivia";

export type MyEngiviaInputProps = {
  token: string;
};

export const MyEngiviaInput: VFC<MyEngiviaInputProps> = (props) => {
  const [text, setText] = useState("");
  const url = "/trivia";
  const router = useRouter();
  const { broadcastId } = router.query;
  const [buttonDisabledState, setButtonDisabledState] = useState(false);

  const body = {
    content: text,
    token: props.token,
    broadcastId,
  };

  const handleOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSend = async () => {
    if (!text || !/\S/g.test(text)) {
      toast.error("エンジビアを入力してください");
      return;
    }
    setButtonDisabledState(true);
    const toastId = toast.loading("Sending...");
    const statusCode = await postTrivia(url, body, body.token);
    console.log(statusCode);
    if (statusCode >= 400) {
      toast.error("保存できませんでした", { id: toastId });
      setButtonDisabledState(false);
    } else {
      toast.success("保存成功しました", { id: toastId });
      setTimeout(() => router.push("/broadcast"), 2000);
    }
  };

  return (
    <PageRoot>
      <Textarea placeholder="エンビジアを入力する" value={text} onChange={handleOnChange} />
      <Button color="primary" onClick={handleSend} disabled={buttonDisabledState}>
        保存する
      </Button>
      <Toaster />
    </PageRoot>
  );
};
