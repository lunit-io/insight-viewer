export const CODE = `\
  import ImageViewer, { useImage, useViewport } from '@lunit/insight-viewer'

  export default function Viewer() {
    const { image } = useImage({
      imageId: IMAGE_ID,
    })
    const { viewport, setViewport } = useViewport()

    return (
      <ImageViewer 
        image={image} 
        viewport={viewport}
        onViewportChange={setViewport}
      >
        <OverlayLayer viewport={viewport} />
      </ImageViewer>
    )
  }
  `
