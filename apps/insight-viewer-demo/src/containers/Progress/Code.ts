export const BASE_CODE = `\
import ImageViewer, { useImage } from '@lunit/insight-viewer'

export default function Viewer() {
  const { image } = useImage({
    imageId: IMAGE_ID,
  })

  return <ImageViewer image={image} />
}
`
export const CUSTOM_CODE = `\
import ImageViewer, { useImage } from '@lunit/insight-viewer'

export default function Viewer() {
  const { image } = useImage({
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
