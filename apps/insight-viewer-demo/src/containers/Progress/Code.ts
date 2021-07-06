export const BASE_CODE = `\
import Viewer from '@lunit/insight-viewer'

export default function Viewer() {
  return <Viewer.Dicom imageId={IMAGE_ID} />
}
`
export const CUSTOM_CODE = `\
import Viewer from '@lunit/insight-viewer'

export default function Viewer() {
  return (
    <Viewer.Dicom 
      imageId={IMAGE_ID} 
      Progress={CustomProgress} 
    />
  )
}
`
