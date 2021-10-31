import type { VFC } from "react";
import { BroadcastStatus } from "src/components/BroadcastStatus";
import { statusCheck } from "src/components/functions/statusCheck";
import { styled } from "src/utils";

type Props = {
	title: string;
	status: "live" | "upcoming" | "ended";
};

export const BroadcastHeader: VFC<Props> = (props) => {
	const result = statusCheck(props.status);
	return (
		<Wrap>
			<BroadCastWrap>
				<BroadcastStatus color={result.color}>{result.label}</BroadcastStatus>
			</BroadCastWrap>

			<Title>{props.title}</Title>
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
