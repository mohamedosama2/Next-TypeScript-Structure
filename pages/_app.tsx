import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../store";
import { SessionProvider, useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import { NextComponentType, NextPageContext } from "next";
import "@fortawesome/fontawesome-svg-core/styles.css";
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from "@fortawesome/fontawesome-svg-core";
import "bootstrap/dist/css/bootstrap.min.css";

config.autoAddCss = false; /* eslint-disable import/first */

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      {(Component.auth as any) ? (
        <Auth>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </Auth>
      ) : (
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      )}
    </SessionProvider>
  );
}

export default MyApp;

interface IProps {
  children: any;
}

function Auth({ children }: IProps) {
  const { data: session, status } = useSession();
  const isUser = !!session?.user;

  useEffect(() => {
    if (status === "loading") return;
    if (!isUser) window.location.href = "/";
  }, [isUser, status]);

  if (isUser) {
    return children;
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <div>Loading...</div>;
}
