import { styled } from "src/utils";

export const Button = styled("button", {
  all: "unset",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.75rem",

  paddingY: "0.75rem",
  paddingX: "1.5rem",

  borderRadius: 5,
  cursor: "pointer",

  variants: {
    color: {
      white: {
        paddingY: "0.5rem",
        paddingX: "0.75rem",
        backgroundColor: "$white",
        border: "1px solid $slate8",
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
      smallerSecondary: {
        backgroundColor: "$primary5",
        color: "$primary11",
        "&:hover": { backgroundColor: "$primary6" },
        paddingY: "0.5rem",
        paddingX: "1rem",
        height: "20px",
        borderRadius: "9999px",
      },
      smallerPrimary: {
        backgroundColor: "$primary9",
        color: "white",
        "&:hover": { backgroundColor: "$primary10" },
        paddingY: "0.5rem",
        paddingX: "1rem",
        height: "20px",
        borderRadius: "9999px",
      },
      verySmallerPrimary: {
        backgroundColor: "#006ADC",
        color: "white",
        "&:hover": { backgroundColor: "$primary10" },
        paddingY: "0.3rem",
        paddingX: "0.5rem",
        height: "20px",
        fontSize: "13px",
        borderRadius: "9999px",
      },
    },
  },
});
