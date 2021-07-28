export const CODE = `\
  import Viewer, { useImageLoad, useViewport } from '@lunit/insight-viewer'

  export default function Viewer() {
    const { image } = useImageLoad({
      imageId: IMAGE_ID,
    })
    const { viewport, setViewport } = useViewport()

    return (
      <Viewer.Dicom 
        image={image} 
        viewport={viewport}
        onViewportChange={setViewport}
      >
        <OverlayLayer viewport={viewport} />
      </Viewer.Dicom>
    )
  }
  `
