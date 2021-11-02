/* eslint-disable @typescript-eslint/naming-convention */
import type { NextPage } from "next";
import Image from "next/image";
import { Button } from "src/components/Button";
import { styled } from "src/utils";

const SigninPage: NextPage = () => {
	return (
		<SigninPageRoot>
			<LeftSide>
				<Image src="/fountain-logo.jpg" alt="噴水のアイコン" width={70} height={80} />
				<Title>エンジビアの泉</Title>
				<SubTitle>〜素晴らしきプログラミングマメ知識〜</SubTitle>
				<Spacer />
				<Button color="white">
					<Image src="/slack-logo.svg" alt="slackのアイコン" width={22} height={22} />
					Sign in with Slack
				</Button>
			</LeftSide>

			<RightSide>
				<Image src="/trivia.png" alt="トリビアの泉" layout="fill" />
			</RightSide>
		</SigninPageRoot>
	);
};

// eslint-disable-next-line import/no-default-export
export default SigninPage;

const SigninPageRoot = styled("div", {
	position: "relative",

	height: "100vh",
	width: "100vw",

	backgroundColor: "$slate1",
});

const Title = styled("h1", {
	fontSize: "1.75rem",
	fontWeight: 900,

	color: "$blue10",
	WebkitTextStrokeWidth: "1.2px",
	WebkitTextStrokeColor: "rgb(251,191,39)",
});

const SubTitle = styled("p", {
	fontSize: "0.9rem",
	fontWeight: 700,

	color: "$blue8",
	WebkitTextStrokeWidth: "0.8px",
	WebkitTextStrokeColor: "rgb(251,191,39)",
});

const LeftSide = styled("div", {
	position: "absolute",
	zIndex: 50,

	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
	gap: "0.5rem",

	height: "100vh",
	width: "40%",

	backgroundColor: "$slate1",
});

const RightSide = styled("div", {
	position: "absolute",
	zIndex: 10,
	right: 0,

	width: "100vh",
	minHeight: "100vh",

	height: "100vh",
});

const Spacer = styled("div", {
	height: "1rem",
});
