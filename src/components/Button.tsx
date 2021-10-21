import { styled } from "src/utils";

export const SampleButton = styled("button", {
	all: "unset",
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	gap: "0.5rem",
	paddingY: "0.5rem",
	paddingX: "1rem",
	borderRadius: 10,

	variants: {
		color: {
			white: {
				backgroundColor: "$white",
				border: "2px solid $slate8",
				"&:hover": { backgroundColor: "$slate5" },
			},
			blue: {
				backgroundColor: "$primary9",
				color: "white",
				"&:hover": { backgroundColor: "$primary10" },
			},
			sky: {
				backgroundColor: "$primary4",
				color: "$primary11",
				"&:hover": { backgroundColor: "$primary5" },
			},
		},
	},

	defaultVariants: {
		color: "sky",
	},
});
