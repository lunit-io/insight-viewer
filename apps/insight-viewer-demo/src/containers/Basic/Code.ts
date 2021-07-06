export const DICOM_CODE = `\
import Viewer from '@lunit/insight-viewer'

export default function() {
  return <Viewer.Dicom imageId={IMAGE_ID} />
}
`
export const WEB_CODE = `\
import Viewer from '@lunit/insight-viewer'

export default function() {
  return <Viewer.Web imageId={WEB_URL} />
}
`
