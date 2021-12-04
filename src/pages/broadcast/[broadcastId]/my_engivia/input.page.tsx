/* eslint-disable react-hooks/rules-of-hooks */
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { BroadcastHeader } from "src/components";
import { Button, PageRoot, Textarea } from "src/components/styled";
import { handlePutTrivia } from "src/hooks/handlePutTrivia";

const EngiviaInputPage: NextPage = () => {
  const [text, setText] = useState("");
  const url = "/trivia";
  const router = useRouter();

  // 一旦ハードコーディングしているので、ここでは書き換えていない
  const body = {
    content: text,
    token: "token2",
    broadcastId: 2,
  };

  const handleOnChange = (e: any) => {
    setText(e.target.value);
  };

  const handleSend = async () => {
    if (text === "") return;
    const res = await handlePutTrivia(url, body);
    if (res.ok) {
      toast.success("保存に成功しました");
      router.push("/broadcast");
      setText("");
    } else {
      toast.error("保存できませんでした");
    }
  };

  return (
    <PageRoot>
      <BroadcastHeader status="live" title="第1回エンジビアの泉" />
      <Textarea placeholder="エンビジアを入力する" value={text} onChange={handleOnChange} />
      <Button color="primary" onClick={handleSend}>
        保存する
      </Button>
      <div>
        <Toaster />
      </div>
    </PageRoot>
  );
};

// eslint-disable-next-line import/no-default-export
export default EngiviaInputPage;
