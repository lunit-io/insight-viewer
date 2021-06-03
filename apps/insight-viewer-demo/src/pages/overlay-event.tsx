import dynamic from 'next/dynamic'

const DynamicComponentWithNoSSR = dynamic(
  () => import('../containers/OverlayEvent'),
  { ssr: false }
)

export default DynamicComponentWithNoSSR
