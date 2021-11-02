import { styled } from "src/utils";

export const Button = styled("button", {
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
      primary: {
        backgroundColor: "$primary9",
        color: "white",
        "&:hover": { backgroundColor: "$primary10" },
      },
      secondary: {
        backgroundColor: "$primary4",
        color: "$primary11",
        "&:hover": { backgroundColor: "$primary5" },
      },
      tertiary: {
        backgroundColor: "#BFE4F7",
        color: "#8AC4E1",
        "&:hover": { backgroundColor: "sky" },
      },
      quaternary: {
        backgroundColor: "#006ADC",
        color: "white",
        "&:hover": { backgroundColor: "sky" },
      },
    },
  },

  defaultVariants: {
    color: "sky",
  },
});
