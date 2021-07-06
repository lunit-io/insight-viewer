export const CODE = `\
  import Viewer, { useViewport } from '@lunit/insight-viewer'

  export default function Viewer() {
    const { viewport, setViewport } = useViewport()

    return (
      <Viewer.Dicom 
        imageId={IMAGE_ID} 
        viewport={viewport}
        onViewportChange={setViewport}
      >
        <OverlayLayer viewport={viewport} />
      </Viewer.Dicom>
    )
  }
  `
