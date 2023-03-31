import dynamic from 'next/dynamic'

const DynamicComponentWithNoSSR = dynamic(() => import('../containers/CombinedOverlay/Tab'), {
  ssr: false,
})

export default DynamicComponentWithNoSSR
