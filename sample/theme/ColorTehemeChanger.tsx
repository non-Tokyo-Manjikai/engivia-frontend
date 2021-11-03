import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { useTheme } from "next-themes";
import type { VFC } from "react";
import { useEffect, useState } from "react";
import { CircleImg } from "sample";
import { slideDownAndFade, slideLeftAndFade, slideRightAndFade, slideUpAndFade } from "sample/animation";
import { RadioGroup } from "src/components/theme/RadioGroup";
import { styled } from "src/utils";

type Props = {
	iconPath: string;
};

export const ColorTehemeChanger: VFC<Props> = (props) => {
	const { setTheme, resolvedTheme } = useTheme();
	const [isMounted, setIsMounted] = useState(false);
	const [currentColor, setCurrentColor] = useState("");

	const handleClick = (e: any) => {
		if (e.target.value === undefined) return;
		if (resolvedTheme?.indexOf("light") === 0) {
			const customColor = "light_" + e.target.value;
			setTheme(customColor);
		} else {
			const customColor = "dark_" + e.target.value;
			setTheme(customColor);
		}
	};

	useEffect(() => {
		resolvedTheme && setCurrentColor(resolvedTheme.split("_")[1]);
		return setIsMounted(true);
	}, []);

	if (!isMounted) return null;
	return (
		<HoverCardPrimitive.Root>
			<HoverCardPrimitive.Trigger asChild>
				<ImageTrigger href="#" rel="noreferrer noopener">
					<CircleImg src={props.iconPath} />
				</ImageTrigger>
			</HoverCardPrimitive.Trigger>

			<HoverCardContent sideOffset={5}>
				<HoverCardArrow offset={25} />

				<RadioGroup
					options={RADIO_OPTIONOS}
					defaultValue={currentColor}
					ariaLabel="colorChanger"
					onClick={handleClick}
				/>
			</HoverCardContent>
		</HoverCardPrimitive.Root>
	);
};

type OptionsProps = {
	id: string;
	label: string;
	value: string;
	color: "blue" | "amber" | "crimson" | "violet" | "orange" | "green";
};

const RADIO_OPTIONOS: OptionsProps[] = [
	{ id: "1", label: "Blue", value: "blue", color: "blue" },
	{ id: "2", label: "amber", value: "amber", color: "amber" },
	{ id: "3", label: "crimson", value: "crimson", color: "crimson" },
	{ id: "4", label: "violet", value: "violet", color: "violet" },
	{ id: "5", label: "orange", value: "orange", color: "orange" },
	{ id: "6", label: "green", value: "green", color: "green" },
];

export const HoverCardContent = styled(HoverCardPrimitive.Content, {
	width: 300,
	borderRadius: "1rem",
	padding: "1.25rem",
	backgroundColor: "$slate3",
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

const ImageTrigger = styled("a", {
	all: "unset",
	cursor: "pointer",
	borderRadius: "100%",
	width: "fit-content",
	backgroundColor: "red",
	display: "inline-block",
	"&:focus": { boxShadow: `0 0 0 2px white` },
});
