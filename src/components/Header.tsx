import { styled } from "src/utils";
import type { FC } from "react";
import Image from "next/image";

export const Header: FC = () => {
  return (
    <Container>
      <Div>
        <Image src="/fountain-logo.jpg" alt="噴水ロゴ" width={35} height={38} />
        <H1>エンビジアの泉</H1>
      </Div>
      <Icon />
    </Container>
  );
};

const Container = styled("header", {
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  padding: "16px 32px 16px 32px",
  background: "$slate1",
  borderBottom: "solid 1px $slate4",
  alignItems: "center",
});

const Div = styled("div", {
  display: "flex",
});

const H1 = styled("h1", {
  color: "$sky11",
  fontSize: "20px",
  fontWeight: "700",
  WebkitTextStrokeWidth: "0.6px",
  WebkitTextStrokeColor: "rgb(251,191,39)",
  marginLeft: "10px",
  display: "flex",
  alignItems: "center",
});

const Icon = styled("div", {
  square: "30px",
  borderRadius: "9999px",
  background: "$blue11",
});

// const Svg = styled("svg", {
//   width: "100%",
//   height: "32px",
//   overflow: "visible",
//   marginLeft: "10px",
// });

// const Text = styled("text", {
//   fill: "$blue10",
//   fontWeight: "700",
//   fontSize: "18px",
//   stroke: "$amber9",
//   strokeWidth: 0.7,
//   mrgin: "auto",
// });
