import React from 'react'
import { DICOMImageViewer, WebImageViewer, ViewContext } from './Viewer'
import { handleError } from './utils/common'

type Viewer = ({ imageId }: { imageId: string }) => JSX.Element

interface Prop {
  onError?: (e: Error) => void
}

export default function useInsightViewer(
  { onError }: Prop = { onError: handleError }
): {
  DICOMImageViewer: Viewer
  WebImageViewer: Viewer
} {
  const DICOMImageViewerWithContent: Viewer = ({ imageId }) => (
    <ViewContext.Provider value={{ onError }}>
      <DICOMImageViewer imageId={imageId} />
    </ViewContext.Provider>
  )

  const WebImageViewerWithContent: Viewer = ({ imageId }) => (
    <ViewContext.Provider value={{ onError }}>
      <WebImageViewer imageId={imageId} />
    </ViewContext.Provider>
  )

  return {
    DICOMImageViewer: DICOMImageViewerWithContent,
    WebImageViewer: WebImageViewerWithContent,
  }
}
