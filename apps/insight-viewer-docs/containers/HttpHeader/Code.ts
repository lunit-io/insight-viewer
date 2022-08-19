export const CODE = `\
import InsightViewer, { useImage } from '@lunit/insight-viewer'

const style = {
  width: '500px',
  height: '500px'
}

const requestInterceptor = (request: Request) => {
  request.headers.set('Authorization', 'Bearer blahblah')
}

export default function() {
  const { image } = useImage({
    wadouri: IMAGE_ID,
    requestInterceptor
  })

  return (
    <div style={style}>
      <InsightViewer image={image} />
    </div>
  )
}
`
