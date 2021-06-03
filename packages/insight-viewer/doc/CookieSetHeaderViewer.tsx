import React from 'react'
import useInsightViewer from '../src/hooks/useInsightViewer'

const IMAGE_ID = 'wadouri:/api/with-cookie'

export default function CookieSetHeaderViewer(): JSX.Element {
  const { DICOMImageViewer } = useInsightViewer({
    setHeader: () => {
      document.cookie =
        'authToken=test; expires=Sun, 1 Jan 2023 00:00:00 UTC; path=/'
    },
  })
  return <DICOMImageViewer imageId={IMAGE_ID} />
}
