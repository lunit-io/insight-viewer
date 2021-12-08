export const CODE = `\
import InsightViewer, { useImage, useOverlayContext } from '@lunit/insight-viewer'

const style = {
  width: '500px',
  height: '500px'
}

function Heatmap() {
  function draw() {
    // ...
    setToPixelCoordinateSystem(drawingContext)
    // drawing codes...
  }

  return ...
}

export default function App() {
  const { image } = useImage({
    web: IMAGE_ID,
  })
  const { setToPixelCoordinateSystem } = useOverlayContext()

  return (
    <div style={style}> // Wrapper size is required because InsightViewer's width/height is '100%'.
      <InsightViewer image={image}>
        <Heatmap />
      </InsightViewer>
    </div>
  )
}
`
