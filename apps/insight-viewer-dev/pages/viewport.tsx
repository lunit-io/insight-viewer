import dynamic from 'next/dynamic'

const DynamicComponentWithNoSSR = dynamic(() => import('../containers/Viewport'), { ssr: false })

export default DynamicComponentWithNoSSR
