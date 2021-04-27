import { AppProps } from 'next/app'
import Layout from '../components/Layout'
import { Chakra } from '../components/Chakra'
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Chakra>
      <Layout title="@lunit/insight-viewer demo">
        <Component {...pageProps} />
      </Layout>
    </Chakra>
  )
}
