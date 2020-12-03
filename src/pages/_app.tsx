import React, { FC } from 'react'
import '../styles/globals.css'
import Head from 'next/head'
import { AppProps } from 'next/app'

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Jornada Solar</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
