import dynamic from 'next/dynamic'

const DynamicComponentWithNoSSR = dynamic(() => import('../containers/Basic'), {
  ssr: false,
})

export default DynamicComponentWithNoSSR
