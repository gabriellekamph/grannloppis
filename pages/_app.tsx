import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { AuthProvider } from '../context/AuthProvider'
import { SellerContext } from '../context/SellerContext'
import { useState } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  const [activeSeller, setActiveSeller] = useState(false)

  return (
    <>
      <Head>
        <title>Grannloppis</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="container mx-auto">
        <SellerContext.Provider value={{ activeSeller, setActiveSeller }}>
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </SellerContext.Provider>
      </div>
    </>
  )
}

export default MyApp
