import dynamic from 'next/dynamic'

const DynamicComponentWithNoSSR = dynamic(() => import('../containers/UseOverlayContext'), { ssr: false })

export default DynamicComponentWithNoSSR
