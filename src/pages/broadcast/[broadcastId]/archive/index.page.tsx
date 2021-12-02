import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { BroadcastHeader, EngiviaCard } from "src/components";
import { Button, Input, PageRoot } from "src/components/styled";
import { handlePutUrl } from "src/hooks/handlePutUrl";
import { useGetEngiviaInfo } from "src/hooks/useGetEngiviaInfo";
import { useGetUserInfo } from "src/hooks/useGetUserInfo";
import toast, { Toaster } from "react-hot-toast";

import { styled } from "src/utils";

//トークンを入手する機能を後で追加
const Token = "admin-token1";

const ArchivePage: NextPage = () => {
  const router = useRouter();
  const { data } = useGetEngiviaInfo(`/broadcast/${router.query.broadcastId}`, Token);
  const { data: userInfo } = useGetUserInfo("/user", Token);
  const [url, setUrlValue] = useState("");

  const [IsAdmin, Status, URL, Trivia, Title] = [
    userInfo?.isAdmin,
    data?.status,
    data?.archiveUrl,
    data?.Trivia,
    data?.title,
  ];

  //Youtubeのサイトであるかどうか確認する
  const myRe = new RegExp("^https://www.youtube.com/embed/");
  const myArray = myRe.test(url);

  const body = {
    token: Token,
    archiveUrl: url,
  };

  const handleChangeUrl = useCallback((e: any) => {
    setUrlValue(() => e.target.value);
  }, []);

  const handleSaveUrl = () => {
    if (myArray === false) {
      toast.error("正しいURLを入力してください");
    } else {
      handlePutUrl(`/broadcast/${router.query.broadcastId}`, body, body.token);
      toast.success("保存しました");
      setUrlValue("");
    }
  };

  return (
    <PageRoot>
      <BroadcastHeader status={Status} title={Title} />

      {Status === "ended" && URL ? (
        <Iframe src={URL} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen />
      ) : null}

      <Toaster />

      {IsAdmin ? (
        <>
          <Input type="text" placeholder="URLを入力" onChange={handleChangeUrl} value={url} />
          <Button color="primary" onClick={handleSaveUrl}>
            保存する
          </Button>
        </>
      ) : null}

      {Trivia
        ? Trivia.map((item, index) => (
            <EngiviaCard
              key={item.id}
              id={item.id}
              content={item.content}
              name={item.User.name}
              isResult
              heeCount={item.hee}
              engiviaNumber={index + 1}
            />
          ))
        : null}
    </PageRoot>
  );
};

const Iframe = styled("iframe", {
  width: 700,
  height: 450,
});

// eslint-disable-next-line import/no-default-export
export default ArchivePage;
