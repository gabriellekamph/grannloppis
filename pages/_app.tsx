import "../styles/globals.css"
import type { AppProps } from "next/app"
import Head from 'next/head'
import Script from "next/script";

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <>
    <Script async 
        type="text/javascript"
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBVQe5X9fDymMlDm7FoWAAsxpYwXy2c1Fg&libraries=places"
      />
          <Head>
        <title>Grannloppis</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="container mx-auto">
        <Component {...pageProps} />
      </div>
    </>
  )
}

export default MyApp;
