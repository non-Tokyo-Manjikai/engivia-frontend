/* eslint-disable react/jsx-handler-names */
/* eslint-disable @typescript-eslint/naming-convention */
import type { NextPage } from "next";
import Link from "next/link";
import { parseCookies } from "nookies";
import { Button } from "src/components/styled";
import { API_URL } from "src/constants/API_URL";
import { styled } from "src/utils";

const SigninPage: NextPage = () => {
  const cookies = parseCookies();
  return (
    <SigninPageRoot>
      <LeftSide>
        <img src="/fountain-logo.png" alt="噴水のアイコン" width={70} height={80} />
        <Title>エンジビアの泉</Title>
        <SubTitle>〜素晴らしきプログラミングマメ知識〜</SubTitle>
        <Spacer />
        {cookies.token ? (
          <Link href="/broadcast" passHref>
            <Button color="white">
              <img src="/slack-logo.svg" alt="slackのアイコン" width={22} height={22} />
              Sign in with Slack
            </Button>
          </Link>
        ) : (
          <a href={`${API_URL}/slack/signin`}>
            <Button color="white">
              <img src="/slack-logo.svg" alt="slackのアイコン" width={22} height={22} />
              Sign in with Slack
            </Button>
          </a>
        )}
      </LeftSide>

      <RightSide>
        <img src="/trivia.png" alt="トリビアの泉" />
      </RightSide>
    </SigninPageRoot>
  );
};

// eslint-disable-next-line import/no-default-export
export default SigninPage;

const SigninPageRoot = styled("div", {
  position: "relative",

  height: "100vh",
  width: "100vw",

  backgroundColor: "$slate1",
});

const Title = styled("h1", {
  fontSize: "1.75rem",
  fontWeight: 900,

  color: "$blue10",
  WebkitTextStrokeWidth: "1.2px",
  WebkitTextStrokeColor: "rgb(251,191,39)",
});

const SubTitle = styled("p", {
  fontSize: "0.9rem",
  fontWeight: 700,

  color: "$blue8",
  WebkitTextStrokeWidth: "0.8px",
  WebkitTextStrokeColor: "rgb(251,191,39)",
});

const LeftSide = styled("div", {
  position: "absolute",
  zIndex: 50,

  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "0.5rem",

  height: "100vh",
  width: "40%",

  backgroundColor: "$slate1",
});

const RightSide = styled("div", {
  position: "absolute",
  zIndex: 10,
  right: 0,

  width: "100vh",
  height: "100vh",
  minHeight: "100vh",
});

const Spacer = styled("div", {
  height: "1rem",
});
