export const BASE_CODE = `\
import InsightViewer, { useImage } from '@lunit/insight-viewer'

const style = {
  width: '500px',
  height: '500px'
}

export default function() {
  const { image } = useImage({
    wadouri: IMAGE_ID
  })

  return (
    <div style={style}>
      <InsightViewer image={image} />
    </div>
  )
}
`
export const CUSTOM_CODE = `\
import InsightViewer, { ViewerError, useImage } from '@lunit/insight-viewer'

const style = {
  width: '500px',
  height: '500px'
}

function customError(e: ViewerError) {
  alert('error ' + e.message + e.status)
}

export default function() {
  const { image } = useImage({
    wadouri: IMAGE_ID,
    onError: customError
  })

  return (
    <div style={style}>
      <InsightViewer image={image} />
    </div>
  )
}
`
