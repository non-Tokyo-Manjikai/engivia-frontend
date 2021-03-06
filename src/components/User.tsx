/* eslint-disable react/jsx-handler-names */
/* eslint-disable quotes */
/* eslint-disable @next/next/no-img-element */
import { blackA, violet } from "@radix-ui/colors";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { useRouter } from "next/router";
import { destroyCookie, parseCookies } from "nookies";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRecoilState } from "recoil";
import { userInfoState } from "src/components/atoms";
import { Button } from "src/components/styled";
import { UserInfo } from "src/components/UserInfo";
import { deleteUser } from "src/hooks/deleteUser";
import { useGetSWR } from "src/hooks/get.swr";
import type { FetchUserInfo } from "src/types";
import { keyframes, styled } from "src/utils";

export const User = () => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [buttonDisabledState, setButtonDisabledState] = useState(false);
  const router = useRouter();
  // Cookieを読み込む
  const cookies = parseCookies();
  // Cookieに保存されているトークンを使ってユーザー情報を取得する。
  // 本番では userInfo.id === "user2" を !userInfoにした方がいいかも(atomのデフォ値もnullにしたい)
  const { data, error } = useGetSWR<FetchUserInfo>({ url: "/user", shouldFetch: userInfo.id === "user2" });
  if (data && !error && userInfo.id === "user2") {
    // recoilにユーザー情報とトークンを保存する。
    setUserInfo({ ...data, token: cookies.token });
  }

  const handleSignout = () => {
    destroyCookie(null, "token", { path: "/" });
    router.push("/signin");
  };

  const handleDeleteUser = async () => {
    // 連続クリックで重複して送信しないようにする
    setButtonDisabledState(true);
    const toastId = toast.loading("Sending...");
    const statusCode = await deleteUser("/user");
    if (statusCode >= 400) {
      toast.error(`error: ${statusCode}`, { id: toastId });
      setButtonDisabledState(false);
    } else {
      toast.success("退会しました", { id: toastId });
      destroyCookie(null, "token", { path: "/" });
      // トーストを表示した2秒後にページ遷移する
      setTimeout(() => router.push("/signin"), 2000);
    }
  };

  const handleChange = (value: string) => {
    setUserInfo(sampleUserInfo[Number(value)]);
  };

  const handleToggleLeaveOpen = () => {
    setIsLeave(!isleave);
  };

  const [isleave, setIsLeave] = useState(false);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <IconButton aria-label="Update dimensions">
          <Image className="rounded-full" src={userInfo.image} alt="userIcon" />
        </IconButton>
      </PopoverTrigger>
      <PopoverContent sideOffset={5}>
        {isleave ? (
          <>
            <Leave>
              <div>
                <Announce1>本当に退会しますか？</Announce1>
                <br />
                <Announce2>全てのユーザー情報、投稿したエンジビアの内容が削除されます。</Announce2>
              </div>
              <Footer>
                <Button color="secondary" onClick={handleDeleteUser}>
                  退会
                </Button>
                <Button color="primary" onClick={handleToggleLeaveOpen}>
                  戻る
                </Button>
              </Footer>
            </Leave>
          </>
        ) : (
          <>
            <Main>
              <UserInfo />
              <select onChange={(e) => handleChange(e.target.value)}>
                <option value={0}>0</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
              </select>
            </Main>
            <Footer>
              <Button color="smallerPrimary" disabled={buttonDisabledState} onClick={handleSignout}>
                ログアウト
              </Button>
              <Button color="smallerSecondary" disabled={buttonDisabledState} onClick={handleToggleLeaveOpen}>
                退会
              </Button>
            </Footer>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
};

const Leave = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "1.25rem",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  textAlign: "center",
});

const Announce1 = styled("p", {
  paddingY: "1.25rem",
  fontSize: "1.25rem",
  lineHeight: "1.75rem",
});
const Announce2 = styled("p", {
  paddingX: "2.5rem",
});

const Main = styled("div", {
  height: "75%",
  textAlign: "center",
  padding: "10px",
  backgroundColor: "'inherit'",
});

const Image = styled("img", {
  borderRadius: "9999px",
  height: "100%",
  width: "100%",
});

const slideUpAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(2px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

const slideRightAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateX(-2px)" },
  "100%": { opacity: 1, transform: "translateX(0)" },
});

const slideDownAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(-2px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

const slideLeftAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateX(2px)" },
  "100%": { opacity: 1, transform: "translateX(0)" },
});

const StyledContent = styled(PopoverPrimitive.Content, {
  height: "330px",
  width: "250px",
  borderRadius: 4,
  backgroundColor: "#ffffff",
  boxShadow: "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
  "@media (prefers-reduced-motion: no-preference)": {
    animationDuration: "400ms",
    animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
    willChange: "transform, opacity",
    '&[data-state="open"]': {
      '&[data-side="top"]': { animationName: slideDownAndFade },
      '&[data-side="right"]': { animationName: slideLeftAndFade },
      '&[data-side="bottom"]': { animationName: slideUpAndFade },
      '&[data-side="left"]': { animationName: slideRightAndFade },
    },
  },
  "&:focus": {
    boxShadow: `hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px, 0 0 0 2px ${violet.violet7}`,
  },
});

const StyledArrow = styled(PopoverPrimitive.Arrow, {
  fill: "white",
});

// Exports
export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;
export const PopoverContent = StyledContent;
export const PopoverArrow = StyledArrow;

const IconButton = styled("button", {
  all: "unset",
  fontFamily: "inherit",
  borderRadius: "100%",
  height: 40,
  width: 40,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  color: violet.violet11,
  backgroundColor: "white",
  boxShadow: `0 2px 10px ${blackA.blackA7}`,
  "&:hover": { backgroundColor: violet.violet3 },
});

const Footer = styled("div", {
  display: "flex",
  gap: "20px",
  height: "25%",
  justifyContent: "center",
  alignItems: "center",
});

const sampleUserInfo = [
  {
    id: "admin1",
    name: "管理者１",
    image:
      "https://secure.gravatar.com/avatar/e57b3678017c2e646e065d9803735508.jpg?s=24&d=https%3A%2F%2Fa.slack-edge.com%2Fdf10d%2Fimg%2Favatars%2Fava_0013-24.png",
    isAdmin: true,
    token: "admin-token1",
  },
  {
    id: "user1",
    name: "テストユーザー１",
    image:
      "https://secure.gravatar.com/avatar/e57b3678017c2e646e065d9803735508.jpg?s=24&d=https%3A%2F%2Fa.slack-edge.com%2Fdf10d%2Fimg%2Favatars%2Fava_0013-24.png",
    isAdmin: false,
    token: "token1",
  },
  {
    id: "user2",
    name: "テストユーザー２",
    image:
      "https://secure.gravatar.com/avatar/e57b3678017c2e646e065d9803735508.jpg?s=24&d=https%3A%2F%2Fa.slack-edge.com%2Fdf10d%2Fimg%2Favatars%2Fava_0013-24.png",
    isAdmin: false,
    token: "token2",
  },
];
