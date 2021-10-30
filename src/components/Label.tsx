import { styled } from "@stitches/react";

export const Label = styled("label", {
	all: "unset",
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	padding: "10px",
	gap: "0.25rem",
	borderRadius: 9999,
	fontWeight: 500,

	variants: {
		size: {
			base: { fontSize: "0.9rem", height: "2rem", paddingX: "1rem" },
			lg: { fontSize: "1rem", height: "2.5rem", paddingX: "1.75rem" },
			xl: {
				fontSize: "1.1rem",
				height: "3.25rem",
				paddingX: "5rem",
			},
		},

		isOutline: {
			primary: {
				color: "$primary9",
				backgroundColor: "$slate2",
				border: "1px solid $primary9",
				boxSizing: "border-box",
			},
			red: {
				color: "$red9",
				backgroundColor: "$slate2",
				border: "1px solid $red9",
				boxSizing: "border-box",
			},
			slate: {
				color: "$slate12",
				backgroundColor: "$slate2",
				border: "1px solid $slate9",
				boxSizing: "border-box",
			},
		},

		isGhost: {
			primary: {
				color: "$primary9",
				backgroundColor: "$slate2",
			},
			red: {
				color: "$red9",
				backgroundColor: "$slate2",
			},
			slate: {
				color: "$slate12",
				backgroundColor: "$slate2",
			},
		},

		color: {
			primary: {
				color: "white",
				backgroundColor: "$primary9",
			},
			red: {
				color: "white",
				backgroundColor: "$red9",
			},
			slate: {
				color: "white",
				backgroundColor: "$slate9",
			},
		},
	},

	defaultVariants: {
		size: "base",
	},
});
