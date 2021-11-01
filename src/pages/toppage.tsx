import Image from "next/image";
import { styled } from "src/utils";

const toppage = () => {
  return (
    <Container>
      <LeftWrapper>
        <Image src="/fountain-logo.jpg" alt="噴水" width={120} height={80} />
        <h1>エンジビアの泉</h1>
        <p>〜素晴らしきプログラミングマメ知識〜</p>
        <a>
          <Image src="/slack-logo.svg" alt="噴水" width={120} height={80} />
          <p>Sign in with Slack</p>
        </a>
      </LeftWrapper>

      <RightWrapper></RightWrapper>
    </Container>
  );
};

// eslint-disable-next-line import/no-default-export
export default toppage;

const Container = styled("div", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  width: "100vw",
  backgroundColor: "#fafafa",
});

const LeftWrapper = styled("div", {
  width: "60%",
});

const RightWrapper = styled("div", {
  width: "40%",
  height: "100%",
  backgroundImage: "/wow.jpg",
});
