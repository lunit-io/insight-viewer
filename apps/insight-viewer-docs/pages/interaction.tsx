import dynamic from 'next/dynamic'

const DynamicComponentWithNoSSR = dynamic(() => import('../containers/Interaction'), { ssr: false })

export default DynamicComponentWithNoSSR
