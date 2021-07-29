/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
import { AppProps } from 'next/app'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { Chakra } from '../components/Chakra'
import '../styles/globals.css'

const Layout = dynamic(() => import('../components/Layout'), { ssr: false })

// eslint-disable-next-line @typescript-eslint/no-explicit-any
if (typeof window !== 'undefined' && !(window as any).Cypress) {
  const { worker } = require('../mocks/browser')

  worker.start({
    onUnhandledRequest: 'bypass',
  })
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
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Chakra>
    </>
  )
}
