/* eslint-disable react-hooks/rules-of-hooks */
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { PageRoot } from "src/components/styled";
import { API_URL } from "src/constants/API_URL";
import { styled } from "src/utils";
import useSWR from "swr";
import fetch from "unfetch";

type User = {
  id: string;
  name: string;
  isAdmin: boolean;
  image: string;
  token: string;
};

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("slack oauth error");
  }
  return res.json();
};

const signinRedirectPage: NextPage = () => {
  const router = useRouter();
  // const setUserInfoState = useSetRecoilState(userInfoState);
  const [cookies, setCookie] = useCookies(["userInfo"]);
  // Slack認証をしてユーザー情報を取得する
  const { data, error } = useSWR<User>(`${API_URL}/slack/token?code=${router.query.code}`, fetcher);
  if (data && !error && !cookies.userInfo) {
    // setUserInfoState(data);
    setCookie("userInfo", data, { path: "/" });
  }
  if (cookies.userInfo) {
    router.push("/broadcast");
  }
  console.dir(cookies);
  console.log(`redirect cookies.userInfo: ${cookies.userInfo}`);
  return <PageRoot>{error ? <H1>認証エラー</H1> : data ? null : <H1>認証中</H1>}</PageRoot>;
};

// eslint-disable-next-line import/no-default-export
export default signinRedirectPage;

const H1 = styled("h1", {
  paddingTop: "5rem",
  fontSize: "2rem",
  fontWeight: "bold",
});
