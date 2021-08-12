export const CODE = `\
  import InsightViewer, { useImage, useViewport } from '@lunit/insight-viewer'

  export default function Viewer() {
    const { image } = useImage({
      imageId: IMAGE_ID,
    })
    const { viewport, setViewport } = useViewport()

    return (
      <InsightViewer 
        image={image} 
        viewport={viewport}
        onViewportChange={setViewport}
      >
        <OverlayLayer viewport={viewport} />
      </InsightViewer>
    )
  }
  `
