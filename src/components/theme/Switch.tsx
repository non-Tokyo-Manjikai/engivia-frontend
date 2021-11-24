import * as SwitchPrimitive from "@radix-ui/react-switch";
import type { VFC } from "react";
import { styled } from "src/utils";

type Props = {
  labalLeft?: string;
  labalRight?: string;
  defaultChecked?: boolean;
  isDark?: true;
  onClick?: () => void;
};

export const Switch: VFC<Props> = (props) => {
  return (
    <Flex>
      <LeftLabel htmlFor="s1">{props.labalLeft}</LeftLabel>
      <SwitchRoot defaultChecked={props.defaultChecked} id="s1" onClick={props.onClick} isDark={props.isDark}>
        <SwitchThumb />
      </SwitchRoot>
      <RightLabel htmlFor="s1">{props.labalRight}</RightLabel>
    </Flex>
  );
};

const SwitchRoot = styled(SwitchPrimitive.Root, {
  all: "unset",
  width: 50,
  height: 24,
  backgroundColor: "$slate7",
  borderRadius: 9999,
  border: "1px solid $slate11",
  boxSizing: "border-box",
  '&[data-state="checked"]': { backgroundColor: "$primary9" },

  variants: {
    isDark: {
      true: {
        backgroundColor: "$slate7",
        '&[data-state="checked"]': { backgroundColor: "$slate9" },
      },
    },
  },
});

const SwitchThumb = styled(SwitchPrimitive.Thumb, {
  display: "block",
  square: 18,
  borderRadius: 9999,
  backgroundColor: "white",
  transition: "transform 100ms",
  transform: "translateX(2px)",
  willChange: "transform",
  '&[data-state="checked"]': { transform: "translateX(28px)" },
});

const Flex = styled("label", {
  paddingY: "0.5rem",
  display: "flex",
  alignItems: "center",
});

const LeftLabel = styled("label", {
  fontSize: "$base",
  paddingRight: "0.75rem",
  color: "$slate12",
});

const RightLabel = styled("label", {
  fontSize: "$base",
  paddingLeft: "0.75rem",
  color: "$slate12",
});
