import { styled } from "src/utils";

export const SampleIcon = styled("img", {
	variants: {
		size: {
			base: { square: 25 },
		},
	},

	defaultVariants: {
		size: "base",
	},
});
