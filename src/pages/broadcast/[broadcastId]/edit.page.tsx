import { format, utcToZonedTime } from "date-fns-tz";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRecoilValue } from "recoil";
import { userInfoState } from "src/components/atoms";
import { Button, Input, PageRoot, Title } from "src/components/styled";
import { requestFetcher } from "src/functions/requestFetcher";
import { useGetSWRWithToken } from "src/hooks/useGetSWR";
import type { BroadcastLive } from "src/types";
import { styled } from "src/utils";

const BroadcastEditPage: NextPage = () => {
  const router = useRouter();
  const userInfo = useRecoilValue(userInfoState);
  const [titleValue, setTitleValue] = useState("");
  const [dateValue, setDateValue] = useState<string>("");
  const [buttonDisabledState, setButtonDisabledState] = useState(false);

  const { data, isError } = useGetSWRWithToken<BroadcastLive>(`/broadcast/${router.query.broadcastId}`, userInfo.token);

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

    const toastId = toast.loading("Sending...");
    setButtonDisabledState(true);

    const NewDate = new Date(dateValue);
    const NewScheduledStartTime = NewDate.toISOString();
    const PutBody = {
      scheduledStartTime: NewScheduledStartTime,
      title: titleValue,
    };

    // 更新処理
    const { statusCode } = await requestFetcher(
      `/broadcast/${router.query.broadcastId}`,
      PutBody,
      "PUT",
      userInfo.token,
    );

    if (statusCode >= 400) {
      toast.error(`error: ${statusCode}`, { id: toastId });
      setButtonDisabledState(false);
      return;
    }

    toast.success("保存成功しました", { id: toastId });
    setTimeout(() => router.push(`/broadcast/${router.query.broadcastId}/live/admin`), 2000);
  };

  useEffect(() => {
    if (data && data.id) {
      const date = new Date(data.scheduledStartTime);
      const jaDate = utcToZonedTime(date, "Asia/tokyo");
      const NewFormatDate = format(jaDate, "yyyy-MM-dd", { timeZone: "Asia/tokyo" });
      setDateValue(NewFormatDate);
      setTitleValue(data.title);
    }
  }, [data]);

  if (isError) toast.error("エラーが起きました");

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

      <Toaster />
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
