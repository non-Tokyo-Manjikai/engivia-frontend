import type { VFC } from "react";
import { styled } from "src/utils";

export const EngiviaCard: VFC = () => {
	return (
		<Wrap>
			<EngiviaTitle>HTMLにはポータルという便利な要素がある</EngiviaTitle>

			<UserInfo>
				<Icon />
				<UserName>松平 ケン</UserName>
			</UserInfo>
		</Wrap>
	);
};

const Wrap = styled("div", {
	display: "flex",
	flexDirection: "column",
	alignItems: "flex-start",
	gap: "1rem",

	padding: "2rem",
	width: 700,

	borderRadius: 10,
	backgroundColor: "$slate2",
	boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)",
});

const EngiviaTitle = styled("h3", {
	fontWeight: 500,
	fontSize: "2.25rem",
	lineHeight: "2.5rem",

	color: "$slate12",
});

const UserInfo = styled("div", {
	display: "flex",
	justifyContent: "flex-start",
	alignItems: "center",
	gap: "0.5rem",
});

const Icon = styled("div", {
	square: 35,
	borderRadius: 9999,
	background: "$primary9",
});

const UserName = styled("span", {
	fontSize: "0.9rem",
	fontWeight: 500,
	color: "$slate11",
});
