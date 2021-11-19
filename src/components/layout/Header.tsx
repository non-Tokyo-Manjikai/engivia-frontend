/* eslint-disable @typescript-eslint/naming-convention */
import Image from "next/image";
import type { VFC } from "react";
import { ColorThemeChanger } from "src/components/theme";
import { styled } from "src/utils";
import { User } from "src/components/User";

export const Header: VFC = () => {
	return (
		<Root>
			<LeftSide>
				<Image src="/fountain-logo.jpg" alt="噴水ロゴ" width={30} height={34} />
				<Title>エンビジアの泉</Title>
			</LeftSide>

			<RightSide>
				<ColorThemeChanger />
				<User />
			</RightSide>
		</Root>
	);
};

const Root = styled("header", {
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",

	width: "100%",
	paddingX: "2.5rem",
	paddingY: "1rem",

	background: "$slate1",
	borderBottom: "1px solid $slate4",
});

const LeftSide = styled("div", {
	display: "flex",
	alignItems: "center",
});

const Title = styled("h1", {
	display: "flex",

	marginLeft: "0.5rem",

	color: "$sky11",
	fontSize: "1.2rem",
	fontWeight: 700,

	WebkitTextStrokeWidth: "0.6px",
	WebkitTextStrokeColor: "rgb(251,191,39)",
});

const RightSide = styled("div", {
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
	gap: "1rem",
});
