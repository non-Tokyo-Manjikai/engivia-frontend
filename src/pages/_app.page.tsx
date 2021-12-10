import "src/styles/globals.css";

import { IdProvider } from "@radix-ui/react-id";
import type { AppProps } from "next/app";
import { memo } from "react";
import { CookiesProvider } from "react-cookie";
import { RecoilRoot } from "recoil";
import { Layout } from "src/components/layout";
import { WithTheme } from "src/components/theme";
import { getFetcherWithToken } from "src/functions/getFetcher";
import { SWRConfig } from "swr";

const MyApp = (props: AppProps) => {
  return (
    <SWRConfig
      value={{
        fetcher: getFetcherWithToken,
      }}
    >
      <IdProvider>
        <CookiesProvider>
          <RecoilRoot>
            <Layout>
              <props.Component {...props.pageProps} />
            </Layout>
          </RecoilRoot>
        </CookiesProvider>
      </IdProvider>
    </SWRConfig>
  );
};

// eslint-disable-next-line import/no-default-export
export default memo(WithTheme(MyApp));
