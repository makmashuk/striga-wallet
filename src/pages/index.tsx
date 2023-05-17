import Head from "next/head";
import Register from "@/components/modules/Register/Register";

export default function Home() {
  return (
    <>
      <Head>
        <title>Striga Wallet</title>
        <meta name="description" content="A Wallet for Bitcoin" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        ></link>
      </Head>

      <Register />
    </>
  );
}
