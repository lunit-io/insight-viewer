import React, { ReactElement } from 'react'
import Viewer from '../src/Viewer'

const IMAGE_ID =
  'wadouri:https://raw.githubusercontent.com/cornerstonejs/cornerstoneWADOImageLoader/master/testImages/CT2_J2KR'

export const BasicViewer = (): ReactElement => (
  <div style={{ width: 500, height: 500 }}>
    <Viewer imageId={IMAGE_ID} />
  </div>
)

export default {
  title: 'Viewer',
  component: Viewer,
}
