import type { VFC } from "react";
import { BroadcastStatus } from "src/components/BroadcastStatus";
import { statusCheck } from "src/components/functions/statusCheck";
import { AcademicCapIcons, ScheduleIcons } from "src/components/Icons";
import { styled } from "src/utils";

type Props = {
	id: number;
	title: string;
	scheduledStartTime: string;
	status: "live" | "upcoming" | "ended";
	count: number;
};

export const BroadcastItem: VFC<Props> = (props) => {
	const result = statusCheck(props.status);
	return (
		<Card>
			<Upper>
				<BroadCastTitle>{props.title}</BroadCastTitle>
				<BroadcastStatus color={result.color}>{result.label}</BroadcastStatus>
			</Upper>

			<Lower>
				<ScheduleIcons />
				<Date>{props.scheduledStartTime}</Date>

				<FlexGrow />

				<AcademicCapIcons />
				<CountLabel>エンジビア数</CountLabel>
				<span>{props.count}</span>
			</Lower>
		</Card>
	);
};

const Card = styled("li", {
	width: 700,
	paddingX: "1.5rem",
	paddingY: "1rem",

	backgroundColor: "$slate2",
	borderBottom: "1px solid $slate6",
	cursor: "pointer",

	"&:hover": {
		backgroundColor: "$slate4",
	},
	"&:first-child": {
		borderTopRadius: 5,
	},
	"&:last-child": {
		borderBottom: "none",
		borderBottomRadius: 5,
	},
});

const Upper = styled("div", {
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",

	paddingBottom: "0.5rem",
});

const BroadCastTitle = styled("div", {
	fontSize: "1rem",
	color: "$blue9",
});

const Lower = styled("div", {
	display: "flex",
	justifyContent: "space-evenly",
	alignItems: "center",

	fontSize: "0.9rem",
	color: "$slate11",
});

const FlexGrow = styled("div", {
	flexGrow: 1,
});

const Date = styled("span", {
	paddingLeft: "0.5rem",
});

const CountLabel = styled("span", {
	paddingLeft: "0.5rem",
	paddingRight: "0.25rem",

	color: "$slate11",
});
