import { useRouter } from "next/router";
import type { ReactNode, VFC } from "react";
import {HistoryBackButton } from "src/components/BackIcon";
import { Header } from "src/components/layout";
import { styled } from "src/utils";

type Props = {
  children: ReactNode;
};

export const Layout: VFC<Props> = (props) => {
  const router = useRouter();
  const notSignin = router.pathname !== "/signin" && router.pathname !== "/signin/oauth_redirect";
  const notBroadcastList = router.pathname !== "/broadcast";

  return (
    <Root>
      {notSignin && <Header />}
      <Page notSignin={notSignin}>
        {props.children}
        {notBroadcastList && <HistoryBackButton />}
      </Page>
    </Root>
  );
};

const Root = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "100vw",
  maxHeight: "100vh",
});

const Page = styled("div", {
  flex: 1,
  overflowY: "scroll",

  variants: {
    notSignin: {
      true: {
        paddingTop: "2rem",
        paddingBottom: "150px",
      },
    },
  },
});
