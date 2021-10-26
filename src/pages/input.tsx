import { BroadcastTag } from "src/components/BroadcastTag";
import { Button } from "src/components/Button";
import { Layout } from "src/components/Layout";
import { Textarea } from "src/components/Textarea";
import { styled } from "src/utils";

const Input = () => {
  return (
    <Layout>
      <Div1>
        <Div2>
          <BroadcastTag color="orange">放送前・エンジビア募集中</BroadcastTag>
        </Div2>

        <H1>第4回エンビジアの泉</H1>
        <Div3>
          <Textarea placeholder="エンビジアを入力する" />
        </Div3>
        <Button color="blue">保存する</Button>
      </Div1>
    </Layout>
  );
};

// eslint-disable-next-line import/no-default-export
export default Input;

const Div1 = styled("div", {
  textAlign: "center",
});

const Div2 = styled("div", {
  paddingTop: "106px",
  marginBottom: "16px",
});

const Div3 = styled("div", {
  display: "block",
  textAlign: "center",
  marginX: "auto",
  marginY: "32px",
});

const H1 = styled("h1", {
  fontSize: "30px",
  fontWeight: "600",
});
