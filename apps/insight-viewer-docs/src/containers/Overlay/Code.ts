export const CODE = `\
  import InsightViewer, { useImage, useViewport } from '@lunit/insight-viewer'

  const style = {
    width: '500px',
    height: '500px'
  }

  export default function Viewer() {
    const { image } = useImage({
      imageId: IMAGE_ID,
    })
    const { viewport, setViewport } = useViewport()

    return (
      <div style={style}>
        <InsightViewer 
          image={image} 
          viewport={viewport}
          onViewportChange={setViewport}
        >
          <OverlayLayer viewport={viewport} />
        </InsightViewer>
      </div>
    )
  }
  `
