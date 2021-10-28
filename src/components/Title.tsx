import { BroadcastTag } from "src/components/BroadcastTag";
import { styled } from "src/utils";

export const EngibeerTitle = (props: any) => {
  return (
    <>
      <Div>
        {props.type === "before" ? <BroadcastTag color="orange">放送前・エンジビア募集中</BroadcastTag> : null}
        {props.type === "now" ? <BroadcastTag color="green">放送中</BroadcastTag> : null}
        {props.type === "after" ? <BroadcastTag color="gray">放送済み</BroadcastTag> : null}
      </Div>

      <H1>第{props.id}回エンビジアの泉</H1>
    </>
  );
};

export const H1 = styled("h1", {
  fontSize: "30px",
  fontWeight: "600",
});

export const Div = styled("div", {
  paddingTop: "106px",
  marginBottom: "16px",
});
