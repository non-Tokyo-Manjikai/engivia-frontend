import { styled } from "src/utils";

export const Svg = styled("svg", {
  color: "$slate10",

  variants: {
    size: {
      sm: { square: 15 },
      base: { square: 20 },
      lg: { square: 25 },
    },
  },

  defaultVariants: {
    size: "base",
  },
});
