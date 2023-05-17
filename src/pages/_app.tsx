import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material";
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next/types";
import theme from "../utils/theme";
import { SnackbarProvider } from "notistack";
import { UserContextProvider } from "@/context/user";
import { WalletContextProvider } from "@/context/wallet";
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <>
      <ThemeProvider theme={theme}>
        <UserContextProvider>
          <WalletContextProvider>
            <SnackbarProvider preventDuplicate>
              {/* {getLayout(<Component {...pageProps} />)} */}
              <Component {...pageProps} />
            </SnackbarProvider>
          </WalletContextProvider>
        </UserContextProvider>
      </ThemeProvider>
    </>
  );
}
