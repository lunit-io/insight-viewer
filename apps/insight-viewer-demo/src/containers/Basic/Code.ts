export const DICOM_CODE = `\
import ImageViewer, { useImageLoad } from '@lunit/insight-viewer'

export default function App() {
  const { image } = useImageLoad({
    imageId: IMAGE_ID,
  })

  return <ImageViewer image={image} />
}
`
export const WEB_CODE = `\
import ImageViewer from '@lunit/insight-viewer'

export default function App() {
  return <ImageViewer imageId={WEB_URL} />
}
`
