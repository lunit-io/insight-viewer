import dynamic from 'next/dynamic'

const DynamicComponentWithNoSSR = dynamic(() => import('../containers/Annotation'), {
  ssr: false,
})

export default DynamicComponentWithNoSSR
