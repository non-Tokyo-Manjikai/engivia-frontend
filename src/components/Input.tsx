import { styled } from "src/utils";

export const Input = styled("input", {
	type: "text",

	paddingY: "0.5rem",
	paddingX: "1rem",
	borderRadius: 5,

	width: 700,

	border: "2px solid $slate6",
	backgroundColor: "$slate2",
	outline: "none",

	"&::placeholder": { color: "$slate7" },
	"&:focus": { border: "solid 2px $primary6" },
});
