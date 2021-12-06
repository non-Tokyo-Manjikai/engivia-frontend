import "src/styles/globals.css";

import { IdProvider } from "@radix-ui/react-id";
import type { AppProps } from "next/app";
import { memo } from "react";
import { RecoilRoot } from "recoil";
import { Layout } from "src/components/layout";
import { WithTheme } from "src/components/theme";
import { SWRConfig } from "swr";
import { getFetcherWithToken } from "src/functions/getFetcher";

const MyApp = (props: AppProps) => {
  return (
    <SWRConfig
      value={{
        fetcher: getFetcherWithToken,
      }}
    >
      <IdProvider>
        <RecoilRoot>
          <Layout>
            <props.Component {...props.pageProps} />
          </Layout>
        </RecoilRoot>
      </IdProvider>
    </SWRConfig>
  );
};

// eslint-disable-next-line import/no-default-export
export default memo(WithTheme(MyApp));
