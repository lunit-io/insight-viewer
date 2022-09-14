import dynamic from 'next/dynamic'

const DynamicComponentWithNoSSR = dynamic(() => import('../containers/Overlay'), { ssr: false })

export default DynamicComponentWithNoSSR
