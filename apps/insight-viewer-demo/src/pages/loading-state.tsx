import dynamic from 'next/dynamic'

const DynamicComponentWithNoSSR = dynamic(
  () => import('../containers/LoadingState'),
  { ssr: false }
)

export default DynamicComponentWithNoSSR
