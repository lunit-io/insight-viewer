import dynamic from 'next/dynamic'

const DynamicComponentWithNoSSR = dynamic(() => import('../containers/CombineOverlay/Tab'), {
  ssr: false,
})

export default DynamicComponentWithNoSSR
