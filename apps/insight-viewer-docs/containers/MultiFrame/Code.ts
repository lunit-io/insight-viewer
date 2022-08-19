export const CODE = `\
import InsightViewer, { useMultipleImages, useFrame } from '@lunit/insight-viewer'

const IMAGES = [
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000000.dcm',
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000001.dcm',
  ...
]

const style = {
  width: '500px',
  height: '500px'
}

export default function Viewer() {
  const { images } = useMultipleImages({
    wadouri: IMAGES,
    initialFrame,       // optional: initialValue | 0(default)
    onError,            // optional
    requestInterceptor, // optional
  })
  const { frame, setFrame } = useFrame({
    initial: 0,
    max: images.length - 1,
  })

  return (
    <div style={style}>
      <InsightViewer image={images[frame]} />
    </div>
  )
}
`
