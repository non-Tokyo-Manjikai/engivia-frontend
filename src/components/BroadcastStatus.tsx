import { styled } from "src/utils";

export const BroadcastStatus = styled("div", {
	all: "unset",
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",

	paddingY: "0.1rem",
	paddingX: "0.75rem",

	fontSize: "0.9rem",
	borderRadius: 9999,

	variants: {
		color: {
			orange: {
				backgroundColor: "$orange4",
				color: "$orange11",
			},
			green: {
				backgroundColor: "$mint5",
				color: "$mint11",
			},
			gray: {
				backgroundColor: "$slate6",
				color: "$slate12",
			},
		},
	},
});
