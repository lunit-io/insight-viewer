import { AppProps } from 'next/app'
import { Layout } from '../components/Layout'
import { Chakra } from '../components/Chakra'

const isServer = typeof window === 'undefined'

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  if (isServer) return <></>
  return (
    <Chakra>
      <Layout title="@lunit/insight-viewer demo">
        <Component {...pageProps} />
      </Layout>
    </Chakra>
  )
}
