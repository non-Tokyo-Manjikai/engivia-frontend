import type { NextPage } from "next";
import { PageRoot } from "src/components/PageRoot";

const NotFoundPage: NextPage = () => {
	return <PageRoot>ページが見つかりませんでした</PageRoot>;
};

// eslint-disable-next-line import/no-default-export
export default NotFoundPage;
