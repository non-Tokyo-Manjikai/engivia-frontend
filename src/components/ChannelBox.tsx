import { styled } from "src/utils";
import { mauve, blackA } from "@radix-ui/colors";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { Channel } from "src/components/Channel";

const Card = styled("div", {
	backgroundColor: "white",
	borderRadius: "5px",
	width: "100%",
	paddingLeft: "20px",
	marginTop: "15px",
	textAlign: "center",
});

const Content = styled("div", {
	paddingTop: "10px",
	textAlign: "left",
});

const Footer = styled("div", {
	display: "flex",
	justifyContent: "space-between",
});

const Person = styled("div", {
	display: "flex",
	flexDirection: "row",
});

const Name = styled("p", {
	padding: "10px",
	margin: "auto",
});

const Hee = styled("p", {
	borderRadius: "5px",
	color: "#59ADC8",
	fontWeight: "bold",
	fontSize: "1.5rem",
	padding: "15px",
	margin: "10px",
	textAlign: "center",
	backgroundColor: "#fef5e0",
});

export const ChannelBox = () => {
	return (
    <ScrollArea>
      <ScrollAreaViewport>
        <Box>
          <Channel />
          <Channel />
          <Channel /> 
          <Channel /> 
        </Box>
      </ScrollAreaViewport>
      <ScrollAreaScrollbar orientation="vertical">
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
      <ScrollAreaScrollbar orientation="horizontal">
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
      <ScrollAreaCorner />
    </ScrollArea>
  );
};

//RadixUI_ScrollBar
const SCROLLBAR_SIZE = 10;

const ScrollArea = styled(ScrollAreaPrimitive.Root, {
  width: "100%",
  height: 425,
  borderRadius: 4,
  overflow: "hidden",
  // boxShadow: `0 2px 10px ${blackA.blackA7}`,
});

const ScrollAreaViewport = styled(ScrollAreaPrimitive.Viewport, {
  width: "100%",
  height: "100%",
  borderRadius: "inherit",
});

const ScrollAreaScrollbar = styled(ScrollAreaPrimitive.Scrollbar, {
  display: "flex",
  // ensures no selection
  userSelect: "none",
  // disable browser handling of all panning and zooming gestures on touch devices
  touchAction: "none",
  padding: 2,
  background: blackA.blackA6,
  transition: "background 160ms ease-out",
  "&:hover": { background: blackA.blackA8 },
  '&[data-orientation="vertical"]': { width: SCROLLBAR_SIZE },
  '&[data-orientation="horizontal"]': {
    flexDirection: "column",
    height: SCROLLBAR_SIZE,
  },
});

const ScrollAreaThumb = styled(ScrollAreaPrimitive.Thumb, {
  flex: 1,
  background: mauve.mauve10,
  borderRadius: SCROLLBAR_SIZE,
  // increase target size for touch devices https://www.w3.org/WAI/WCAG21/Understanding/target-size.html
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    height: "100%",
    minWidth: 44,
    minHeight: 44,
  },
});

const ScrollAreaCorner = styled(ScrollAreaPrimitive.Corner, {
  background: blackA.blackA8,
});

// Your app...
const Box = styled("div", {});

const TAGS = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`);

