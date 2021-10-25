import { styled } from "src/utils";

export const BroadcastTag = styled("button", {
  all: "unset",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  paddingY: "3px",
  paddingX: "1rem",
  borderRadius: "30px",

  variants: {
    color: {
      orange: {
        backgroundColor: "$orange4",
        color: "$orange11",
      },
      green: {
        backgroundColor: "$mint5",
        color: "$mint11",
      },
      gray: {
        backgroundColor: "$slate6",
        color: "$slate12",
      },
    },
  },

  defaultVariants: {
    color: "orange",
  },
});
export default BroadcastTag;

const Div = styled("div", {
  display: "block",
  flexDirection: "column",
  marginX: "auto",
  justifyContent: "center",
});
