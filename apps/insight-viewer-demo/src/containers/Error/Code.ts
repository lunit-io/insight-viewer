export const BASE_CODE = `\
import Viewer, { useImageLoad } from '@lunit/insight-viewer'

export default function() {
  const { image } = useImageLoad({
    imageId: IMAGE_ID
  })

  return <Viewer.Dicom image={image} />
}
`
export const CUSTOM_CODE = `\
import { useCallback } from 'react'
import Viewer, { ViewerError, useImageLoad } from '@lunit/insight-viewer'

const customError = useCallback((e: ViewerError) => {
  setError(e.message + e.status)
}, [])

export default function() {
  const { image } = useImageLoad({
    imageId: IMAGE_ID,
    onError: customError
  })

  return <Viewer.Dicom image={image} />
}
`
