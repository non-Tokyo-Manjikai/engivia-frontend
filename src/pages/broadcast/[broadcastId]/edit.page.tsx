import type { NextPage } from "next";
import { useRouter } from "next/router";
import { format, utcToZonedTime } from "date-fns-tz";
import { Button, Input, PageRoot, Title } from "src/components/styled";
import { useGetEngiviaInfo } from "src/hooks/useGetEngiviaInfo";
import { styled } from "src/utils";
import { useCallback, useEffect, useState } from "react";
import { handlePutTrivia } from "src/hooks/handlePutTrivia";
import toast, { Toaster } from "react-hot-toast";
import { useRecoilValue } from "recoil";
import { userInfoState } from "src/components/atoms";

const BroadcastEditPage: NextPage = () => {
  const router = useRouter();
  const userInfo = useRecoilValue(userInfoState);

  //broadcast/[id]/live/adminから遷移してくる時にrouter.query.broadcastIdを渡してくる
  const { data, isError } = useGetEngiviaInfo(`/broadcast/${router.query.broadcastId}`, userInfo.token);
  const [dateValue, setDateValue] = useState<string>("");
  const [titleValue, setTitleValue] = useState("");
  const [buttonDisabledState, setButtonDisabledState] = useState(false);

  if (isError) {
    toast.error("エラーが起きました");
  }

  useEffect(() => {
    if (data && data.id) {
      const date = new Date(data.scheduledStartTime);
      const jaDate = utcToZonedTime(date, "Asia/tokyo");
      const NewFormatDate = format(jaDate, "yyyy-MM-dd", { timeZone: "Asia/tokyo" });
      setDateValue(NewFormatDate);
      setTitleValue(data.title);
    }
  }, [data]);

  const handleDateChange = useCallback((e: any) => {
    setDateValue(e.target.value);
  }, []);

  const handleTitleChange = useCallback((e: any) => {
    setTitleValue(e.target.value);
  }, []);

  const handleCancel = () => {
    router.push(`/broadcast/${router.query.broadcastId}/live/admin`);
  };

  const handleSaveEngiviaInfo = async () => {
    // タイトル、放送日を指定しないと作成できないようにする。空白文字列も作成できない。
    if (!dateValue || !titleValue || !/\S/g.test(titleValue)) {
      toast.error("タイトルと放送日を指定してください");
      return;
    }
    // 連続クリックで重複して送信しないようにする
    setButtonDisabledState(true);

    const NewDate = new Date(dateValue);
    const NewScheduledStartTime = NewDate.toISOString();
    const body = {
      scheduledStartTime: NewScheduledStartTime,
      title: titleValue,
    };
    const toastId = toast.loading("Sending...");

    const statusCode = await handlePutTrivia(`/broadcast/${router.query.broadcastId}`, body, userInfo.token);
    if (statusCode >= 400) {
      toast.error(`error: ${statusCode}`, { id: toastId });
      setButtonDisabledState(false);
    } else {
      toast.success("保存成功しました", { id: toastId });
      // トーストを表示した2秒後にページ遷移する
      setTimeout(() => router.push(`/broadcast/${router.query.broadcastId}/live/admin`), 2000);
    }
  };

  return (
    <PageRoot>
      <Title>放送を編集</Title>
      <Input type="text" placeholder="タイトルを入力する" value={titleValue} onChange={handleTitleChange} />
      <Input type="date" value={dateValue} onChange={handleDateChange} />
      <ButtonWrap>
        <Button color="primary" disabled={buttonDisabledState} onClick={handleSaveEngiviaInfo}>
          保存する
        </Button>
        <Button color="secondary" disabled={buttonDisabledState} onClick={handleCancel}>
          キャンセル
        </Button>
      </ButtonWrap>
      <div>
        <Toaster />
      </div>
    </PageRoot>
  );
};

// eslint-disable-next-line import/no-default-export
export default BroadcastEditPage;

const ButtonWrap = styled("div", {
  display: "flex",
  justifyContent: "center",
  gap: "2rem",
});
