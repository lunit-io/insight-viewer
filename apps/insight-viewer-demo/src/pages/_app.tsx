/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
import { AppProps } from 'next/app'
import Head from 'next/head'
import Layout from '../components/Layout'
import { Chakra } from '../components/Chakra'
import '../styles/globals.css'

if (typeof window !== 'undefined') {
  const { worker } = require('../mocks/browser')

  worker.start()
}

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <title>@lunit/insight-viewer demo</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Chakra>
        <Layout title="@lunit/insight-viewer demo">
          <Component {...pageProps} />
        </Layout>
      </Chakra>
    </>
  )
}
