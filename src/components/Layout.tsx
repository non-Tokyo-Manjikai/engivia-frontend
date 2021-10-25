import type { FC } from "react";
import { styled } from "src/utils";
import { Header } from "src/components/Header";

export const Layout: FC = (props) => {
  return (
    <Container>
      <Div1>
        <Header />
      </Div1>
      <Div2>{props.children}</Div2>
    </Container>
  );
};

const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
});

const Div1 = styled("div", {
  width: "100%",
  minHeight: "100%",
  zIndex: "2",
});

const Div2 = styled("div", {
  flex: "1",
});
