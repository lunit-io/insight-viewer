export const DICOM_CODE = `\
import ImageViewer, { useImage } from '@lunit/insight-viewer'

export default function App() {
  const { loadingState, image } = useImage({
    imageId: IMAGE_ID,
    type: 'Dicom',      // optional: 'Dicom'(Default) | 'Web'
    onError,            // optional
    requestInterceptor, // optional
  })

  return (
    <>
      <div>
        <span>{loadingState}</span>
        {image && <span> ({image.imageId})</span>}
      </div>
      <ImageViewer image={image} />
    </>
  )
}
`
export const WEB_CODE = `\
import ImageViewer, { useImage } from '@lunit/insight-viewer'

export default function App() {
  const { image } = useImage({
    imageId: IMAGE_ID,
    type: 'Web',
    onError,            // optional
    requestInterceptor, // optional
  })

  return <ImageViewer image={image} />
}
`
