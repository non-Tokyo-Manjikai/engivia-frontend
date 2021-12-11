/* eslint-disable indent */
import type { NextPage } from "next";
import { useRouter } from "next/router";
import type { ChangeEvent } from "react";
import { useCallback, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRecoilValue } from "recoil";
import { BroadcastHeader, EngiviaCard } from "src/components";
import { userInfoState } from "src/components/atoms";
import { Button, Input, PageRoot } from "src/components/styled";
import { requestFetcher } from "src/functions/requestFetcher";
import { useGetSWRWithToken } from "src/hooks/useGetSWR";
import type { BroadcastLive } from "src/types";
import { styled } from "src/utils";

const ArchivePage: NextPage = () => {
  const router = useRouter();
  const userInfo = useRecoilValue(userInfoState);
  const [url, setUrlValue] = useState("");

  const { data } = useGetSWRWithToken<BroadcastLive>(`/broadcast/${router.query.broadcastId}`, userInfo.token);

  const handleChangeUrl = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setUrlValue(e.target.value);
  }, []);

  const handleSaveUrl = async () => {
    // eslint-disable-next-line prefer-regex-literals
    const myRe = new RegExp("^https://www.youtube.com/embed/");
    const myArray = myRe.test(url);

    if (myArray === false) {
      toast.error("正しいURLを入力してください");
      return;
    }

    const toastId = toast.loading("Sending...");

    const PutBody = { archiveUrl: url };

    const { statusCode } = await requestFetcher(
      `/broadcast/${router.query.broadcastId}`,
      PutBody,
      "PUT",
      userInfo.token,
    );

    if (statusCode >= 400) {
      toast.error(`error: ${statusCode}`, { id: toastId });
      return;
    }

    toast.success("保存しました", { id: toastId });
    setUrlValue("");
  };

  if (!data || !userInfo) return null;

  return (
    <PageRoot>
      <BroadcastHeader status={data.status} title={data.title} />

      {data.status === "ended" && data.archiveUrl ? (
        <Iframe src={data.archiveUrl} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen />
      ) : null}

      {userInfo.isAdmin ? (
        <>
          <Input type="text" placeholder="URLを入力" onChange={handleChangeUrl} value={url} />
          <Button color="primary" onClick={handleSaveUrl}>
            保存する
          </Button>
        </>
      ) : null}

      {data.Trivia
        ? data.Trivia.map((item, index) => (
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

      <Toaster />
    </PageRoot>
  );
};

// eslint-disable-next-line import/no-default-export
export default ArchivePage;

const Iframe = styled("iframe", {
  width: 700,
  height: 450,
});
