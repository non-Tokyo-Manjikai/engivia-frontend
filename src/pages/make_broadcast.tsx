import type { NextPage } from "next";
import { Button } from "src/components/Button";
import { Input } from "src/components/Input";
import { styled } from "src/utils";

const MakeBroadcast: NextPage = () => {
  return (
    <Wrap>
      <H1>放送を作成</H1>
      <Input placeholder="タイトルを入力する" />
      <Input placeholder="2021/09/03" />
      <ButtonWrap>
        <Button color="primary">保存する</Button>
        <Button color="primary">キャンセル</Button>
      </ButtonWrap>
    </Wrap>
  );
};

// eslint-disable-next-line import/no-default-export
export default MakeBroadcast;

const Wrap = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "2rem",
});

const H1 = styled("h1", {
  fontSize: "30px",
  fontWeight: "600",
});

const ButtonWrap = styled("div", {
  display: "flex",
  justifyContent: "center",
  gap: "2rem",
});
