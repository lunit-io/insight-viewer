export const DICOM_CODE = `\
import InsightViewer, { useImage } from '@lunit/insight-viewer'

const style = {
  width: '500px',
  height: '500px'
}

export default function App() {
  const { loadingState, image } = useImage({
    wadouri: IMAGE_ID,
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
    web: IMAGE_ID,
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
