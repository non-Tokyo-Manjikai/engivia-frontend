import { styled } from "@stitches/react";

export const Input = styled("input", {
  border: "solid 1px gainsboro",
  type: "text",
  padding: "0.5rem 1rem",
  borderRadius: "6px",
  width: "100%",
  fontSize: "14px",
  outline: "none",
  "&:Focus": { border: "solid 1px skyblue" },
});
