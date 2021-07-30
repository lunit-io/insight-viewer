export const DICOM_CODE = `\
import ImageViewer, { useImageLoad } from '@lunit/insight-viewer'

export default function App() {
  const { loadingState, image } = useImageLoad({
    imageId: IMAGE_ID,
    type: 'Dicom',      // optional(Default)
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
import ImageViewer, { useImageLoad } from '@lunit/insight-viewer'

export default function App() {
  const { image } = useImageLoad({
    imageId: IMAGE_ID,
    type: 'Web',
    onError,            // optional
    requestInterceptor, // optional
  })

  return <ImageViewer image={image} />
}
`
