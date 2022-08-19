import dynamic from 'next/dynamic'

const DynamicComponentWithNoSSR = dynamic(() => import('../containers/DicomfileViewer'), {
  ssr: false,
})

export default DynamicComponentWithNoSSR
