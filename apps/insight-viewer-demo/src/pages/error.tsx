import dynamic from 'next/dynamic'

const DynamicComponentWithNoSSR = dynamic(() => import('../containers/Error'), {
  ssr: false,
})

export default DynamicComponentWithNoSSR
