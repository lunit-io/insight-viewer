export const BASE_CODE = `\
import Viewer, { useImageLoad } from '@lunit/insight-viewer'

export default function Viewer() {
  const { image } = useImageLoad({
    imageId: IMAGE_ID,
  })

  return <Viewer.Dicom image={image} />
}
`
export const CUSTOM_CODE = `\
import Viewer, { useImageLoad } from '@lunit/insight-viewer'

export default function Viewer() {
  const { image } = useImageLoad({
    imageId: IMAGE_ID,
  })

  return (
    <Viewer.Dicom 
      image={image}
      Progress={CustomProgress} 
    />
  )
}
`
