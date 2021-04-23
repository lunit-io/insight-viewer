import InsightViewer from '@lunit/insight-viewer'

const IMAGE_ID =
  'wadouri:https://raw.githubusercontent.com/cornerstonejs/cornerstoneWADOImageLoader/master/testImages/CT2_J2KR'

function Basic(): JSX.Element {
  return <InsightViewer imageId={IMAGE_ID} />
}

export default Basic
