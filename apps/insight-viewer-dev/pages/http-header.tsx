import dynamic from 'next/dynamic'

const DynamicComponentWithNoSSR = dynamic(() => import('../containers/HttpHeader'), { ssr: false })

export default DynamicComponentWithNoSSR
