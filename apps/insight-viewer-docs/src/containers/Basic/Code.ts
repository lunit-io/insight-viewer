export const DICOM_CODE = `\
import InsightViewer, { useImage } from '@lunit/insight-viewer'

const style = {
  width: '500px',
  height: '500px'
}

export default function App() {
  const { loadingState, image } = useImage({
    imageId: IMAGE_ID,
    type: 'Dicom',      // optional: 'Dicom'(Default) | 'Web'
    onError,            // optional
    requestInterceptor, // optional
  })

  return (
    <div style={style}> // Wrapper size is required because InsightViewer's width/height is '100%'.
      <InsightViewer image={image} />
    </div>
  )
}
`
export const WEB_CODE = `\
import InsightViewer, { useImage } from '@lunit/insight-viewer'

const style = {
  width: '500px',
  height: '500px'
}

export default function App() {
  const { image } = useImage({
    imageId: IMAGE_ID,
    type: 'Web',
    onError,            // optional
    requestInterceptor, // optional
  })

  return (
    <div style={style}> // Wrapper size is required because InsightViewer's width/height is '100%'.
      <InsightViewer image={image} />
    </div>
  )
}
`
