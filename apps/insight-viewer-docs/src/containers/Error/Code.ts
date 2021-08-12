export const BASE_CODE = `\
import InsightViewer, { useImage } from '@lunit/insight-viewer'

export default function() {
  const { image } = useImage({
    imageId: IMAGE_ID
  })

  return <InsightViewer image={image} />
}
`
export const CUSTOM_CODE = `\
import { useCallback } from 'react'
import InsightViewer, { ViewerError, useImage } from '@lunit/insight-viewer'

const customError = useCallback((e: ViewerError) => {
  setError(e.message + e.status)
}, [])

export default function() {
  const { image } = useImage({
    imageId: IMAGE_ID,
    onError: customError
  })

  return <InsightViewer image={image} />
}
`
