/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
import { AppProps } from 'next/app'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { Chakra } from '../components/Chakra'
import '../styles/globals.css'
import config from '../config'

const Layout = dynamic(() => import('../components/Layout'), { ssr: false })

// eslint-disable-next-line @typescript-eslint/no-explicit-any
if (typeof window !== 'undefined' && !config.IS_CYPRESS) {
  const { worker } = require('../mocks/browser')

  worker.start({
    onUnhandledRequest: 'bypass',
  })
}

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <title>@lunit/insight-viewer docs</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=1024" />
      </Head>
      <Chakra>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Chakra>
    </>
  )
}
