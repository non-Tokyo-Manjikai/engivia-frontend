import { BroadcastTag } from "src/components/BroadcastTag";
import { Button } from "src/components/Button";
import { Layout } from "src/components/Layout";
import { styled } from "src/utils";

const BroadcastEdit = () => {
  return (
    <Layout>
      <Div1>
        <Div2>
          <BroadcastTag color="orange">放送前・エンジビア募集中</BroadcastTag>
        </Div2>

        <H1>第4回エンビジアの泉</H1>
        <Div3>
          <H3>HTMLにはポータルという便利な要素がある。</H3>

          <UserInfo>
            <Icon />
            <UserName>松平 ケン</UserName>
          </UserInfo>
        </Div3>
        <Div4>
          <Button color="primary">編集する</Button>
          <Button color="secondary">削除する</Button>
        </Div4>
      </Div1>
    </Layout>
  );
};

// eslint-disable-next-line import/no-default-export
export default BroadcastEdit;

const Div1 = styled("div", {
  textAlign: "center",
});

const Div2 = styled("div", {
  paddingTop: "106px",
  marginBottom: "16px",
});

const Div3 = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  marginX: "auto",
  marginY: "32px",
  width: "704px",
  backgroundColor: "#FFFFFF",
  boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)",
  borderRadius: " 8px",
  padding: "20px",
});

const H1 = styled("h1", {
  fontSize: "30px",
  fontWeight: "600",
});

const H3 = styled("h3", {
  fontWeight: "500",
  fontSize: "36px",
  textAlign: "left",
  lineHeight: "40px",
  color: "#111827",
});
const UserInfo = styled("div", {
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  marginTop: "24px",
});
const Icon = styled("div", {
  square: "30px",
  borderRadius: "9999px",
  background: "$blue11",
});

const UserName = styled("p", {
  fontSize: "14px",
  fontWeight: "500",
  color: "#374151",
  marginLeft: "12px",
});

const Div4 = styled("div", {
  display: "flex",
  columnGap: "32px",
  justifyContent: "center",
});
