import { styled } from "@stitches/react";

export const Textarea = styled("textarea", {
	type: "text",

	border: "2px solid $slate6",
	padding: "0.5rem 1rem",
	borderRadius: 5,

	width: 700,
	minHeight: 100,

	fontSize: "1.5rem",
	fontWeight: 700,

	backgroundColor: "$slate2",
	outline: "none",

	"&::placeholder": { color: "$slate7" },
	"&:focus": { border: "solid 2px $primary6" },
});
