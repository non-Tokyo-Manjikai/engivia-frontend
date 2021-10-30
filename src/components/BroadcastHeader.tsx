import type { VFC } from "react";
import { BroadcastStatus } from "src/components/BroadcastStatus";
import { styled } from "src/utils";

export const BroadcastHeader: VFC = () => {
	return (
		<Wrap>
			<BroadCastWrap>
				<BroadcastStatus color="orange">放送前・エンジビア募集中</BroadcastStatus>
			</BroadCastWrap>

			<Title>第4回エンビジアの泉</Title>
		</Wrap>
	);
};

const BroadCastWrap = styled("div", {});

const Wrap = styled("div", {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	gap: "1rem",
});

const Title = styled("h1", {
	fontSize: "1.8rem",
	fontWeight: 700,
});
