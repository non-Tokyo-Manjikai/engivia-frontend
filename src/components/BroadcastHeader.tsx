import type { VFC } from "react";
import { BroadcastTag } from "src/components/BroadcastTag";
import { styled } from "src/utils";

export const BroadcastHeader: VFC = () => {
  return (
    <>
      <Wrap>
        <BroadCastWrap>
          <BroadcastTag color="orange">放送前・エンジビア募集中</BroadcastTag>

          <Title>第4回エンビジアの泉</Title>
        </BroadCastWrap>
      </Wrap>
    </>
  );
};
const BroadCastWrap = styled("div", {
  paddingTop: "100px",
  marginBottom: "20px",
});
const Wrap = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1rem",
});

const Title = styled("h1", { fontSize: "1.75rem", fontWeight: 700 });
