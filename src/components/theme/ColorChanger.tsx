import { useTheme } from "next-themes";
import type { VFC } from "react";
import { useEffect, useState } from "react";
import { RadioGroup } from "src/components/theme";

export const ColorChanger: VFC = () => {
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
		<RadioGroup options={RADIO_OPTIONOS} defaultValue={currentColor} ariaLabel="colorChanger" onClick={handleClick} />
	);
};

type OptionsProps = {
	id: string;
	label: string;
	color: "blue" | "amber" | "crimson" | "violet" | "orange" | "green";
};

const RADIO_OPTIONOS: OptionsProps[] = [
	{ id: "1", label: "Blue", color: "blue" },
	{ id: "2", label: "Amber", color: "amber" },
	{ id: "3", label: "Crimson", color: "crimson" },
	{ id: "4", label: "Violet", color: "violet" },
	{ id: "5", label: "Orange", color: "orange" },
	{ id: "6", label: "Green", color: "green" },
];
