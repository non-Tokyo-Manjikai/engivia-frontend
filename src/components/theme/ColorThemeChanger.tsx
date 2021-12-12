/* eslint-disable quotes */
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import type { VFC } from "react";
import { slideDownAndFade, slideLeftAndFade, slideRightAndFade, slideUpAndFade } from "src/components/animation";
import { PalletIcon } from "src/components/icons";
import { ColorChanger, ThemeChanger } from "src/components/theme";
import { styled } from "src/utils";

export const ColorThemeChanger: VFC = () => {
  return (
    <HoverCardPrimitive.Root>
      <HoverCardPrimitive.Trigger asChild>
        <ImageTrigger>
          <PalletIcon />
        </ImageTrigger>
      </HoverCardPrimitive.Trigger>

      <HoverCardContent sideOffset={5}>
        <HoverCardArrow offset={25} />
        <ColorChanger />
        <ThemeChanger />
      </HoverCardContent>
    </HoverCardPrimitive.Root>
  );
};

export const HoverCardContent = styled(HoverCardPrimitive.Content, {
  width: 170,
  borderRadius: "1rem",
  paddingY: "1.25rem",
  paddingX: "1rem",
  backgroundColor: "$slate4",
  boxShadow: "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
  "@media (prefers-reduced-motion: no-preference)": {
    animationDuration: "400ms",
    animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
    willChange: "transform, opacity",
    '&[data-state="open"]': {
      '&[data-side="top"]': { animationName: slideDownAndFade },
      '&[data-side="right"]': { animationName: slideLeftAndFade },
      '&[data-side="bottom"]': { animationName: slideUpAndFade },
      '&[data-side="left"]': { animationName: slideRightAndFade },
    },
  },
});

export const HoverCardArrow = styled(HoverCardPrimitive.Arrow, {
  fill: "$slate2",
});

const ImageTrigger = styled("span", {
  all: "unset",
  cursor: "pointer",
  borderRadius: 9999,
  border: "1px solid $slate8",
  padding: "0.5rem",
  width: "fit-content",
  display: "inline-block",
  "&:hover": { backgroundColor: "$slate4" },
  "&:focus": { boxShadow: `0 0 0 2px white` },
});
