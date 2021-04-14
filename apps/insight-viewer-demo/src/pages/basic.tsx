// import InsightViewer from '@lunit/insight-viewer'
// 로컬에서 verdaccio로 배포테스트.
import InsightViewer from '../../../../packages/insight-viewer/dist/index.esm'
import { WithoutProp } from '../types'

// eslint-disable-next-line no-console
const handleClick = () => console.log('click')

const Basic: WithoutProp = () => (
  <InsightViewer onClick={handleClick}>Yay!</InsightViewer>
)

export default Basic
