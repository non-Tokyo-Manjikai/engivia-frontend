/* eslint-disable quotes */
/* eslint-disable @next/next/no-img-element */
import { blackA, violet } from "@radix-ui/colors";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import router from "next/router";
import { parseCookies } from "nookies";
import toast from "react-hot-toast";
import { useRecoilState } from "recoil";
import { userInfoState } from "src/components/atoms";
import { Button } from "src/components/styled";
import { UserInfo } from "src/components/UserInfo";
import { requestFetcher2 } from "src/functions/requestFetcher";
import { useGetSWR } from "src/hooks/get.swr";
import type { FetchUserInfo } from "src/types";
import { keyframes, styled } from "src/utils";

export const User = () => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  // Cookieを読み込む
  const cookies = parseCookies();

  // ログアウト機能
  const handleLogOut = () => {
    // トークン削除
    document.cookie = "token=; expires=0";
    router.push("/signin");
  };

  // 退会機能

  const handleLeave = async () => {
    const result = await requestFetcher2("/user", userInfo.token);
    if (result) {
      toast.error("退会できませんでした");

      return;
    }
    toast.success("退会しました");
  };

  // Cookieに保存されているトークンを使ってユーザー情報を取得する。
  // 本番では userInfo.id === "user2"(recoilがデフォルト値である場合) を !userInfoにした方がいいかも(atomのデフォ値もnullにしたい)
  const { data, error } = useGetSWR<FetchUserInfo>({ url: "/user", shouldFetch: userInfo.id === "user2" });

  if (data && !error && userInfo.id === "user2") {
    // recoilにユーザー情報とトークンを保存する。
    setUserInfo({ ...data, token: cookies.token });
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <IconButton aria-label="Update dimensions">
          <Image className="rounded-full" src={userInfo?.image} width={80} height={80} alt="userIcon" />
        </IconButton>
      </PopoverTrigger>
      <PopoverContent sideOffset={5}>
        <Main>
          <UserInfo user={userInfo} />
        </Main>
        <Footer>
          <Button color="smallerSecondary" onClick={handleLogOut}>
            ログアウト
          </Button>
          <Button color="smallerPrimary" onClick={handleLeave}>
            退会
          </Button>
        </Footer>
      </PopoverContent>
    </Popover>
  );
};
const Main = styled("div", {
  height: "75%",
  textAlign: "center",
  padding: "10px",
  backgroundColor: "'inherit'",
});

const Image = styled("img", {
  borderRadius: "9999px",
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
