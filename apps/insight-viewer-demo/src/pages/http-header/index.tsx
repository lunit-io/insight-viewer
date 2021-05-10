import dynamic from 'next/dynamic'
import config from '../../../config'
import Error from '../../components/Error'

const DynamicComponentWithNoSSR = dynamic(
  () => import('../../containers/HttpHeader'),
  { ssr: false }
)

export default config.IS_DEV
  ? DynamicComponentWithNoSSR
  : () => <Error statusCode={404} />
