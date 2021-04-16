import { AppProps } from 'next/app'
import { Layout } from '../components/Layout'
import { Chakra } from '../components/Chakra'

const isServer = typeof window === 'undefined'

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Chakra>
      <Layout title="@lunit/insight-viewer demo">
        {!isServer && <Component {...pageProps} />}
      </Layout>
    </Chakra>
  )
}
