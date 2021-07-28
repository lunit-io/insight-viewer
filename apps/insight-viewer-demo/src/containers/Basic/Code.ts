export const DICOM_CODE = `\
import Viewer, { useImageLoad } from '@lunit/insight-viewer'

export default function App() {
  const { image } = useImageLoad({
    imageId: IMAGE_ID,
  })

  return <Viewer.Dicom image={image} />
}
`
export const WEB_CODE = `\
import Viewer from '@lunit/insight-viewer'

export default function App() {
  return <Viewer.Web imageId={WEB_URL} />
}
`
