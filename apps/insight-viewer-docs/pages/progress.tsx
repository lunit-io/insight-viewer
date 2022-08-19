import dynamic from 'next/dynamic'

const DynamicComponentWithNoSSR = dynamic(() => import('../containers/Progress'), { ssr: false })

export default DynamicComponentWithNoSSR
