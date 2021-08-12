export const BASE_CODE = `\
import InsightViewer, { useImage } from '@lunit/insight-viewer'

export default function Viewer() {
  const { image } = useImage({
    imageId: IMAGE_ID,
  })

  return <InsightViewer image={image} />
}
`
export const CUSTOM_CODE = `\
import InsightViewer, { useImage } from '@lunit/insight-viewer'

export default function Viewer() {
  const { image } = useImage({
    imageId: IMAGE_ID,
  })

  return (
    <InsightViewer 
      image={image}
      Progress={CustomProgress} 
    />
  )
}
`
