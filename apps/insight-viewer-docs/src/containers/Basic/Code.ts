export const DICOM_CODE = `\
import InsightViewer, { useImage } from '@lunit/insight-viewer'

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
      <InsightViewer image={image} />
    </>
  )
}
`
export const WEB_CODE = `\
import InsightViewer, { useImage } from '@lunit/insight-viewer'

export default function App() {
  const { image } = useImage({
    imageId: IMAGE_ID,
    type: 'Web',
    onError,            // optional
    requestInterceptor, // optional
  })

  return <InsightViewer image={image} />
}
`
