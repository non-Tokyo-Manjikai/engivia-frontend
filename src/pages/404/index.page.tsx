import type { NextPage } from "next";
import { HeeButtonKit } from "src/components";
import { PageRoot } from "src/components/styled";
import { styled } from "src/utils";

const NotFoundPage: NextPage = () => {
	return (
		<PageRoot>
			<H1>ページが見つかりませんでした</H1>
			<HeeButtonKit />
		</PageRoot>
	);
};

// eslint-disable-next-line import/no-default-export
export default NotFoundPage;

const H1 = styled("h1", {
	paddingTop: "5rem",
	fontSize: "2rem",
	fontWeight: "bold",
});
