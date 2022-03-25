import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html>
      <Head>
        <script
          async
          type="text/javascript"
          src="https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyBVQe5X9fDymMlDm7FoWAAsxpYwXy2c1Fg"
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
