import dynamic from 'next/dynamic'

const DynamicComponentWithNoSSR = dynamic(() => import('../containers/ViewportReset'), { ssr: false })

export default DynamicComponentWithNoSSR
