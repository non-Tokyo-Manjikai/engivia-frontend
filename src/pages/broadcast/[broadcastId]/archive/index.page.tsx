import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRecoilValue } from "recoil";
import { BroadcastHeader, EngiviaCard } from "src/components";
import { userInfoState } from "src/components/atoms";
import { Button, Input, PageRoot } from "src/components/styled";
import { handlePutTrivia } from "src/hooks/handlePutTrivia";
import { useGetEngiviaInfo } from "src/hooks/useGetEngiviaInfo";
import { useGetUserInfo } from "src/hooks/useGetUserInfo";
import { styled } from "src/utils";

const ArchivePage: NextPage = () => {
  const router = useRouter();
  const userInfo = useRecoilValue(userInfoState);
  const Token = userInfo.token;
  const { data } = useGetEngiviaInfo(`/broadcast/${router.query.broadcastId}`, Token);
  const { data: User } = useGetUserInfo("/user", Token);
  const [url, setUrlValue] = useState("");

  const [IsAdmin, Status, URL, Trivia, Title] = [
    User?.isAdmin,
    data?.status,
    data?.archiveUrl,
    data?.Trivia,
    data?.title,
  ];

  // Youtubeのサイトであるかどうか確認する「https://www.youtube.com/embed/OWoKzNxZWw8」(試し用URL)
  // eslint-disable-next-line prefer-regex-literals
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
      handlePutTrivia(`/broadcast/${router.query.broadcastId}`, body, body.token);
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
            image={item.User.image}
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
