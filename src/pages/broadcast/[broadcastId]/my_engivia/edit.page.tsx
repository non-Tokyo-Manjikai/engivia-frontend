import type { NextPage } from "next";
import { BroadcastHeader } from "src/components";
import { Button, PageRoot, Textarea } from "src/components/styled";
import { styled } from "src/utils";

const EngiviaEditPage: NextPage = () => {
  return (
    <PageRoot>
      <BroadcastHeader status="live" title="第1回エンジビアの泉" />
      <Textarea placeholder="エンビジアを入力する" />
      <ButtonWrap>
        <Button color="primary">編集する</Button>
        <Button color="secondary">削除する</Button>
      </ButtonWrap>
    </PageRoot>
  );
};

// eslint-disable-next-line import/no-default-export
export default EngiviaEditPage;

const ButtonWrap = styled("div", {
  display: "flex",
  justifyContent: "center",
  gap: "2rem",
});
