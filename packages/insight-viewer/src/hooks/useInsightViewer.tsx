import React from 'react'
import ViewContext from '../Viewer/Context'
import { DICOMImageViewer, WebImageViewer } from '../Viewer'
import { handleError } from '../utils/common'
import CircularProgress from '../components/CircularProgress'
import { Viewer, OnError, Progress as ProgressType } from '../types'

interface Prop {
  onError?: OnError
  Progress?: ProgressType
}

export default function useInsightViewer({
  onError = handleError,
  Progress = CircularProgress,
}: Prop = {}): {
  DICOMImageViewer: Viewer
  WebImageViewer: Viewer
} {
  const DICOMImageViewerWithContent: Viewer = ({ imageId }) => (
    <ViewContext.Provider value={{ onError, Progress }}>
      <DICOMImageViewer imageId={imageId} />
    </ViewContext.Provider>
  )

  const WebImageViewerWithContent: Viewer = ({ imageId }) => (
    <ViewContext.Provider value={{ onError, Progress }}>
      <WebImageViewer imageId={imageId} />
    </ViewContext.Provider>
  )

  return {
    DICOMImageViewer: DICOMImageViewerWithContent,
    WebImageViewer: WebImageViewerWithContent,
  }
}
