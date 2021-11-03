import "src/styles/globals.css";

import { IdProvider } from "@radix-ui/react-id";
import type { AppProps } from "next/app";
import { memo } from "react";
import { Layout } from "src/components/layout/Layout";
import { WithTheme } from "src/components/theme";

const MyApp = (props: AppProps) => {
	return (
		<IdProvider>
			<Layout>
				<props.Component {...props.pageProps} />
			</Layout>
		</IdProvider>
	);
};

// eslint-disable-next-line import/no-default-export
export default memo(WithTheme(MyApp));
