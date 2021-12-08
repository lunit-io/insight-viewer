import dynamic from 'next/dynamic'

const DynamicComponentWithNoSSR = dynamic(
  () => import('../containers/Resize'),
  { ssr: false }
)

export default DynamicComponentWithNoSSR
