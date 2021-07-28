export const CODE = `\
import ImageViewer, { useImageLoad } from '@lunit/insight-viewer'

  export default function App() {
    const { loadingState, image } = useImageLoad({
      imageId: IMAGE_ID,
    })

    return (
      <>
        <div>
        loadingState:{' '}
          <span>{loadingState}</span>
          {image && <span> ({image.imageId})</span>}
        </div>
        <ImageViewer image={image} />
      </>
    )
  }
  `
