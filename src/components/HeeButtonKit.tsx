import type { VFC } from "react";
import { memo } from "react";
import { styled } from "src/utils";

type Props = {
  onClick: () => void;
  isDied: boolean;
};

export const HeeButtonKit: VFC<Props> = memo((props) => {
  return (
    <HeeButtonWrap>
      <HeeButton>
        <Hee isDied={props.isDied}>へぇ</Hee>
        <Shadow onClick={props.onClick} disabled={props.isDied} />
        <HeeShadow isDied={props.isDied} />
      </HeeButton>
      <HeeBottom isDied={props.isDied} />
      <Foundation />
      <FoundationShadow />
      <FoundationBottom />
    </HeeButtonWrap>
  );
});

const HeeBottom = styled("div", {
  position: "absolute",
  top: "50px",
  left: "45px",
  transform: "rotateX( -50deg ) ",
  backgroundColor: "$primary10",
  width: "270px",
  height: "170px",
  borderRadius: "100%",
  zIndex: "3",

  variants: {
    isDied: { true: { backgroundColor: "$slate10" } },
  },
});

const HeeShadow = styled("div", {
  position: "absolute",
  top: "90px",
  left: "45px",
  backgroundColor: "$primary10",
  width: "270px",
  height: "45px",
  zIndex: "3",

  variants: {
    isDied: { true: { backgroundColor: "$slate10" } },
  },
});

const Hee = styled("button", {
  position: "absolute",
  top: "5px",
  left: "45px",
  transform: "rotateX( -50deg )",
  backgroundColor: "$primary8",
  width: "270px",
  height: "170px",
  borderRadius: "100%",
  textAlign: "center",
  paddingBottom: "15px",
  fontSize: "4rem",
  color: "white",
  fontWeight: "bold",
  zIndex: "6",

  variants: {
    isDied: { true: { backgroundColor: "$slate8" } },
  },
});

const Shadow = styled("button", {
  position: "absolute",
  top: "5px",
  left: "45px",
  transform: "rotateX( -50deg )",
  width: "270px",
  height: "170px",
  borderRadius: "100%",
  textAlign: "center",
  paddingBottom: "15px",
  fontSize: "4rem",
  color: "white",
  zIndex: "6",
});

const HeeButton = styled("div", {
  "&:active": {
    [`& ${HeeShadow}`]: {
      height: "15px",
      top: "80px",
      transform: "translateY(40px)",
    },
    [`& ${Hee}`]: {
      transform: "translateY(30px) rotateX( -50deg )",
    },
  },
});

const Foundation = styled("div", {
  position: "absolute",
  left: "15px",
  top: "75px",
  transform: "rotateX( -30deg )",
  backgroundColor: "$slate5",
  width: "330px",
  height: "170px",
  borderRadius: "100%",
  zIndex: "2",
});

const FoundationBottom = styled("div", {
  position: "absolute",
  left: "15px",
  top: "100px",
  transform: "rotateX( -40deg )",
  backgroundColor: "$slate8",
  width: "330px",
  height: "170px",
  borderRadius: "100%",
  zIndex: "1",
});

const FoundationShadow = styled("div", {
  position: "absolute",
  left: "15px",
  top: "160px",
  transform: "rotateX( -30deg ) ",
  backgroundColor: "$slate8",
  width: "330px",
  height: "25px",
  zIndex: "1",
});

const HeeButtonWrap = styled("div", {
  position: "relative",
  height: "100px",
  width: "360px",
});
