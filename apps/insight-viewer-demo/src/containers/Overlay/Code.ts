export const CODE = `\
  import ImageViewer, { useImageLoad, useViewport } from '@lunit/insight-viewer'

  export default function Viewer() {
    const { image } = useImageLoad({
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
