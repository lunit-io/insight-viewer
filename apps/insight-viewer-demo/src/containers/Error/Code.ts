export const BASE_CODE = `\
import ImageViewer, { useImageLoad } from '@lunit/insight-viewer'

export default function() {
  const { image } = useImageLoad({
    imageId: IMAGE_ID
  })

  return <ImageViewer image={image} />
}
`
export const CUSTOM_CODE = `\
import { useCallback } from 'react'
import ImageViewer, { ViewerError, useImageLoad } from '@lunit/insight-viewer'

const customError = useCallback((e: ViewerError) => {
  setError(e.message + e.status)
}, [])

export default function() {
  const { image } = useImageLoad({
    imageId: IMAGE_ID,
    onError: customError
  })

  return <ImageViewer image={image} />
}
`
