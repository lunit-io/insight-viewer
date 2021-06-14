import React from 'react'
import Viewer from '../src'

const IMAGE_ID = 'wadouri:/api/with-cookie'

export default function CookieSetHeaderViewer(): JSX.Element {
  const setHeader = () => {
    document.cookie =
      'authToken=test; expires=Sun, 1 Jan 2023 00:00:00 UTC; path=/'
  }
  return <Viewer.Dicom imageId={IMAGE_ID} setHeader={setHeader} />
}
