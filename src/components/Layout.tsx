import type { ReactNode, VFC } from "react";
import { Header } from "src/components/Header";
import { ThemeChanger } from "src/components/theme";
import { ColorChanger } from "src/components/theme/ColorChanger";
import { styled } from "src/utils";

type Props = {
	children: ReactNode;
};

export const Layout: VFC<Props> = (props) => {
	return (
		<Wrap>
			<HeaderWrap>
				<Header />
			</HeaderWrap>

			<BodyWrap>{props.children}</BodyWrap>

			<div className="flex fixed right-2 bottom-2 z-10">
				<ThemeChanger />
				<ColorChanger />
			</div>
		</Wrap>
	);
};

const Wrap = styled("div", {
	display: "flex",
	flexDirection: "column",
	width: "100%",
	maxHeight: "100vh",
});

const HeaderWrap = styled("div", {
	flex: "wrap",
});

const BodyWrap = styled("div", {
	flex: 1,
	paddingTop: "2rem",
	paddingBottom: "150px",
	overflowY: "scroll",
});
