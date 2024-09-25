import "@/styles/globals.scss";
import { AppProps } from "next/app";
import React, { useEffect} from "react";
import { NextPageContext } from 'next';
import {initStore, StoreProvider} from "@/store/store";
import classNames from "classnames";
import Head from "next/head";

const App = ({ Component, pageProps }: AppProps) => {
  const isServer = !process.browser;
  const store = isServer ? pageProps : initStore(pageProps);

  useEffect(() => {

  }, []);

  return (
    <div id="uiContainer" className={classNames("uiContainer")}>
      <div className="uiSizer">
        <Head>
          <title>Solanashuffle</title>
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5"/>
        </Head>

        <StoreProvider store={store}>
          <>
            <Component {...pageProps} />
          </>
        </StoreProvider>
      </div>
    </div>
  );
}

App.getInitialProps = async ({ Component, ctx }: { Component: AppProps, ctx: NextPageContext }) => {
  const store = ctx.store = initStore();

  try {
    let pageProps = {};

    await Promise.all([
        pageProps = (Component?.getInitialProps && await Component?.getInitialProps(ctx)) || {}
    ]);

    return { pageProps: {...store, ...pageProps }};
  } catch (error) {
    console.log('error', error);
    return ({ pageProps: {} });
  }
}

export default App;
