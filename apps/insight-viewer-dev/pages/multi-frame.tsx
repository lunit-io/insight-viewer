import dynamic from 'next/dynamic'

const DynamicComponentWithNoSSR = dynamic(() => import('../containers/MultiFrame'), { ssr: false })

export default DynamicComponentWithNoSSR
