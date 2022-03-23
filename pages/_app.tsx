import "../styles/globals.css"
import type { AppProps } from "next/app"
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
          <Head>
        <title>Grannloppis</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="container mx-auto">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
