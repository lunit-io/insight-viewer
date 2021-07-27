import dynamic from 'next/dynamic'

const DynamicComponentWithNoSSR = dynamic(
  () => import('../containers/LoadingStatus'),
  { ssr: false }
)

export default DynamicComponentWithNoSSR
