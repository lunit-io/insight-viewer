export const BASE_CODE = `\
import Viewer from '@lunit/insight-viewer'

export default function() {
  return <Viewer.Dicom imageId={IMAGE_ID} />
}
`
export const CUSTOM_CODE = `\
import Viewer, { ViewerError } from '@lunit/insight-viewer'

function customError(e: ViewerError): void {
  alert(e.message + e.status)
}

export default function() {
  return <Viewer.Dicom imageId={IMAGE_ID} onError={customError} />
}
`
