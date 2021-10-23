import { styled } from "src/utils";
import type { FC } from "react";

export const Header: FC = () => {
  return (
    <Container>
      <H1>エンビジアの泉</H1>
      <Icon />
    </Container>
  );
};

const Container = styled("header", {
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  padding: "16px 30px 16px 30px",
  background: "$slate1",
  dropShadow: "0px 0px 5px gray",
});

const H1 = styled("h1", {
  color: "$sky11",
  fontSize: "large",
  fontWeight: "700",
  WebkitTextStrokeWidth: "1px",
  WebkitTextStrokeColor: "rgb(251,191,39)",
  display: "-webkit-box",
});

const Icon = styled("div", {
  square: "30px",
  borderRadius: "9999px",
  background: "$blue11",
});
