/* eslint-disable @typescript-eslint/naming-convention */
import Image from "next/image";
import type { VFC } from "react";
import { styled } from "src/utils";

export const Header: VFC = () => {
	return (
		<Wrap>
			<TitleWrap>
				<Image src="/fountain-logo.jpg" alt="噴水ロゴ" width={30} height={34} />
				<Title>エンビジアの泉</Title>
			</TitleWrap>

			<Icon />
		</Wrap>
	);
};

const Wrap = styled("header", {
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",

	width: "100%",
	paddingX: "2.5rem",
	paddingY: "1rem",

	background: "$slate1",
	borderBottom: "1px solid $slate4",
});

const TitleWrap = styled("div", {
	display: "flex",
	alignItems: "center",
});

const Title = styled("h1", {
	display: "flex",

	marginLeft: "10px",

	color: "$sky11",
	fontSize: "1.2rem",
	fontWeight: 700,

	WebkitTextStrokeWidth: "0.6px",
	WebkitTextStrokeColor: "rgb(251,191,39)",
});

const Icon = styled("div", {
	square: 30,
	borderRadius: 9999,
	background: "$primary9",
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
