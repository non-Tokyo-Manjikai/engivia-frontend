import { useRouter } from "next/router";
import type { ReactNode, VFC } from "react";
import { Header } from "src/components/Header";
import { ThemeChanger } from "src/components/theme";
import { ColorChanger } from "src/components/theme/ColorChanger";
import { styled } from "src/utils";

type Props = {
	children: ReactNode;
};

export const Layout: VFC<Props> = (props) => {
	const router = useRouter();
	const notSignin = router.pathname !== "/signin";

	return (
		<Root>
			{notSignin && <Header />}
			<Page notSignin={notSignin}>{props.children}</Page>

			<div className="flex fixed right-2 bottom-2 z-10">
				<ThemeChanger />
				<ColorChanger />
			</div>
		</Root>
	);
};

const Root = styled("div", {
	display: "flex",
	flexDirection: "column",
	width: "100vw",
	maxHeight: "100vh",
});

const Page = styled("div", {
	flex: 1,
	overflowY: "scroll",

	variants: {
		notSignin: {
			true: {
				paddingTop: "2rem",
				paddingBottom: "150px",
			},
		},
	},
});
