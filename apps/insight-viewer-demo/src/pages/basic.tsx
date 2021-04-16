import InsightViewer from '@lunit/insight-viewer'
import consola from 'consola'
import { WithoutProp } from '../types'

const handleClick = () => consola.info('click')

const Basic: WithoutProp = () => (
  <InsightViewer onClick={handleClick}>Yay!</InsightViewer>
)

export default Basic
