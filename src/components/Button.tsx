import { styled } from "src/utils";

export const Button = styled("button", {
	all: "unset",
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	gap: "0.5rem",

	paddingY: "0.75rem",
	paddingX: "1.5rem",

	borderRadius: 5,
	cursor: "pointer",

	variants: {
		color: {
			white: {
				backgroundColor: "$white",
				border: "2px solid $slate8",
				"&:hover": { backgroundColor: "$slate5" },
			},
			primary: {
				backgroundColor: "$primary9",
				color: "white",
				"&:hover": { backgroundColor: "$primary10" },
			},
			secondary: {
				backgroundColor: "$primary5",
				color: "$primary11",
				"&:hover": { backgroundColor: "$primary6" },
			},
		},
	},
});
