export const CODE = `\
import Viewer, { useImageLoadStatus } from '@lunit/insight-viewer'

  export default function App() {
    const { loadingStatus, setLoadingStatus, loaded } = useImageLoadStatus()

    return (
      <>
        <div>
          loadingStatus:{' '}
          <span>{loadingStatus}</span>
          {loaded && <span> ({loaded.imageId})</span>}
        </div>
        <Viewer.Dicom 
          imageId={IMAGE_ID}
          setLoadingStatus={setLoadingStatus}
        />
      </>
    )
  }
  `
