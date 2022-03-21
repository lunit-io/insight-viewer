import dynamic from 'next/dynamic'

const DynamicComponentWithNoSSR = dynamic(() => import('../containers/Measurement'), {
  ssr: false,
})

export default DynamicComponentWithNoSSR
