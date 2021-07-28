export const CODE = `\
import Viewer, { useImageLoadState } from '@lunit/insight-viewer'

  export default function App() {
    const { loadingState, onLoadingStateChanged, image } = useImageLoadState()

    return (
      <>
        <div>
        loadingState:{' '}
          <span>{loadingState}</span>
          {image && <span> ({image.imageId})</span>}
        </div>
        <Viewer.Dicom 
          imageId={IMAGE_ID}
          onLoadingStateChanged={onLoadingStateChanged}
        />
      </>
    )
  }
  `
