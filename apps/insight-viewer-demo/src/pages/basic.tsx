// import InsightViewer from '@lunit/insight-viewer'
// 로컬에서 verdaccio로 배포테스트.
import consola from 'consola'
import InsightViewer from '../../../../packages/insight-viewer/dist/index.esm'
import { WithoutProp } from '../types'

const handleClick = () => consola.info('click')

const Basic: WithoutProp = () => (
  <InsightViewer onClick={handleClick}>Yay!</InsightViewer>
)

export default Basic
