import dynamic from 'next/dynamic'

const DynamicComponentWithNoSSR = dynamic(
  () => import('../containers/Contour'),
  {
    ssr: false,
  }
)

export default DynamicComponentWithNoSSR
