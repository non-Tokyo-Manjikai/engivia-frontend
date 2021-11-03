import { useRouter } from "next/router";
import type { ReactNode, VFC } from "react";
import { Header } from "src/components/layout";
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
