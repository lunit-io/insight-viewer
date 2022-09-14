export const BASE_CODE = `\
import InsightViewer, { useImage } from '@lunit/insight-viewer'

const style = {
  width: '500px',
  height: '500px'
}

export default function Viewer() {
  const { image } = useImage({
    wadouri: IMAGE_ID,
  })

  return (
    <div style={style}>
      <InsightViewer image={image} />
    </div>
  )
}
`
export const CUSTOM_CODE = `\
import InsightViewer, { useImage } from '@lunit/insight-viewer'
import { CircularProgress } from '@chakra-ui/react'

const style = {
  width: '500px',
  height: '500px'
}

function CustomProgress({ progress }: { progress: number }): JSX.Element {
  return <CircularProgress value={progress} />
}

export default function Viewer() {
  const { image } = useImage({
    wadouri: IMAGE_ID,
  })

  return (
    <div style={style}>
      <InsightViewer
        image={image}
        Progress={CustomProgress}
      />
    </div>
  )
}
`
