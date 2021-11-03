import { styled } from "src/utils";

export const Title = styled("h1", {
	width: 700,

	fontSize: "1.75rem",
	fontWeight: 700,

	variants: {
		center: { true: { textAlign: "center" } },
	},
});
