import { styled } from "@stitches/react";

export const Textarea = styled("textarea", {
  border: "solid 2px gainsboro",
  type: "text",
  padding: "0.5rem 1rem",
  borderRadius: "6px",
  width: "704px",
  height: "100%",
  fontSize: "24px",
  fontWeight: "bold",
  "&::placeholder": { color: "LightGray" },
  "&:focus": { border: "solid 2px skyblue" },
  outline: "none",
});
