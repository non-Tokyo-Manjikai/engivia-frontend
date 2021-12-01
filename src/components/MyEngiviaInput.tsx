/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from "next/router";
import type { ChangeEvent, VFC } from "react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Button, PageRoot, Textarea } from "src/components/styled";
import { handlePutTrivia } from "src/hooks/handlePutTrivia";

export type MyEngiviaInputProps = {
  token: string;
};

export const MyEngiviaInput: VFC<MyEngiviaInputProps> = (props) => {
  const [text, setText] = useState("");
  const url = "/trivia";
  const router = useRouter();
  const { broadcastId } = router.query;

  const body = {
    content: text,
    token: props.token,
    broadcastId,
  };

  const handleOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSend = async () => {
    if (text === "") return;
    const res = await handlePutTrivia(url, body, body.token);
    console.log(res);
    if (res.ok) {
      toast.success("保存に成功しました");
      setTimeout(() => router.push("/broadcast"), 2000);
      setText("");
    } else {
      toast.error("保存できませんでした");
    }
  };

  return (
    <PageRoot>
      <Textarea placeholder="エンビジアを入力する" value={text} onChange={handleOnChange} />
      <Button color="primary" onClick={handleSend}>
        保存する
      </Button>
      <Toaster />
    </PageRoot>
  );
};
