export const BASE_CODE = `\
import ImageViewer, { useImageLoad } from '@lunit/insight-viewer'

export default function Viewer() {
  const { image } = useImageLoad({
    imageId: IMAGE_ID,
  })

  return <ImageViewer image={image} />
}
`
export const CUSTOM_CODE = `\
import ImageViewer, { useImageLoad } from '@lunit/insight-viewer'

export default function Viewer() {
  const { image } = useImageLoad({
    imageId: IMAGE_ID,
  })

  return (
    <ImageViewer 
      image={image}
      Progress={CustomProgress} 
    />
  )
}
`
