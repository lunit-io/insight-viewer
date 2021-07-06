export const CODE = `\
import Viewer from '@lunit/insight-viewer'

const requestInterceptor = (request: Request) => {
  request.headers.set('Authorization', 'Bearer blahblah')
}

export default function() {
  return (
    <Viewer.Dicom 
      imageId={IMAGE_ID} 
      requestInterceptor={requestInterceptor} 
    />
  )
}
`
