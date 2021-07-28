export const CODE = `\
import Viewer, { useImageLoad } from '@lunit/insight-viewer'

const requestInterceptor = (request: Request) => {
  request.headers.set('Authorization', 'Bearer blahblah')
}

export default function() {
  const { image } = useImageLoad({
    imageId: IMAGE_ID,
    requestInterceptor
  })

  return (
    <Viewer.Dicom 
      image={image}
    />
  )
}
`
