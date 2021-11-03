import type { NextPage } from "next";
import { Button } from "src/components/Button";
import { ChannelBox } from "src/components/ChannelBox";
import { Layout } from "src/components/Layout";
import { OnAirTag } from "src/components/OnAirTag";
import { styled } from "src/utils";

const LiveAutherPage: NextPage = () => {
	return (
		<Layout>
			<Div1>
				<Div2>
					<OnAirTag color="green">放送中</OnAirTag>
				</Div2>
				<Div3>
					<H1>第4回エンビジアの泉</H1>
					<Button color="tertiary">放送を終了する</Button>
				</Div3>
				<Div4>
					<Div5>
						<H2>フューチャー前</H2>
						<ChannelBox />
					</Div5>
					<Div5>
						<H2>フューチャー中</H2>
						<ChannelBox />
						<Button color="quaternary">タイトルをコールする</Button>
					</Div5>
					<Div5>
						<H2>フューチャー済み</H2>
						<ChannelBox />
					</Div5>
				</Div4>
			</Div1>
			<Card>
				<Content>フィーチャーする</Content>
			</Card>
		</Layout>
	);
};

// eslint-disable-next-line import/no-default-export
export default LiveAutherPage;

const Card = styled("div", {
	all: "unset",
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	paddingY: "0.5rem",
	paddingX: "1rem",
	borderRadius: 10,
	borderStyle: "dashed",
	borderColor: "#DDDDDD",
});

const Content = styled("div", {
	color: "#b3bdc9",
	textAlign: "left",
});

const Div1 = styled("div", {
	textAlign: "center",
});

const Div2 = styled("div", {
	paddingTop: "106px",
	marginBottom: "16px",
});

const Div3 = styled("div", {
	display: "flex",
	columnGap: "32px",
	justifyContent: "center",
});

const Div4 = styled("div", {
	display: "flex",
	width: "80%",
	columnGap: "32px",
	margin: "30px auto 0",
	textAlign: "center",
});

const Div5 = styled("div", {
	width: "80%",
	columnGap: "32px",
	margin: "30px auto 0",
	textAlign: "center",
});

const H1 = styled("h1", {
	fontSize: "30px",
	fontWeight: "600",
	width: "66%",
	paddingLeft: "160px",
});

const H2 = styled("h2", {
	fontSize: "15px",
	fontWeight: "600",
	backgroundColor: "#B4CDDB",
	width: "100%",
	height: "40px",
	padding: "10px",
	alignItems: "center",
	justifyContent: "center",
	borderRadius: "5px",
});
