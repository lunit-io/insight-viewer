import dynamic from 'next/dynamic'
import { WithoutProp } from '../types'

// cornerstone-core: window is not defined
const DynamicComponentWithNoSSR = dynamic(
  () => import('@lunit/insight-viewer'),
  { ssr: false }
)

const IMAGE_ID =
  'wadouri:https://raw.githubusercontent.com/cornerstonejs/cornerstoneWADOImageLoader/master/testImages/CT2_J2KR'

const Basic: WithoutProp = () => (
  <DynamicComponentWithNoSSR imageId={IMAGE_ID} />
)

export default Basic
