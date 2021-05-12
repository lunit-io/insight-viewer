import React from 'react'
import ViewContext from '../Viewer/Context'
import { DICOMImageViewer, WebImageViewer } from '../Viewer'
import { handleError } from '../utils/common'
import CircularProgress from '../components/CircularProgress'
import { Viewer, OnError, Progress as ProgressType, SetHeader } from '../types'

interface Prop {
  onError?: OnError
  Progress?: ProgressType
  setHeader?: SetHeader
}

export default function useInsightViewer({
  onError = handleError,
  Progress = CircularProgress,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setHeader = _request => {},
}: Prop = {}): {
  DICOMImageViewer: Viewer
  WebImageViewer: Viewer
} {
  const DICOMImageViewerWithContent: Viewer = ({ imageId }) => (
    <ViewContext.Provider value={{ onError, Progress, setHeader }}>
      <DICOMImageViewer imageId={imageId} />
    </ViewContext.Provider>
  )

  const WebImageViewerWithContent: Viewer = ({ imageId }) => (
    <ViewContext.Provider value={{ onError, Progress, setHeader }}>
      <WebImageViewer imageId={imageId} />
    </ViewContext.Provider>
  )

  return {
    DICOMImageViewer: DICOMImageViewerWithContent,
    WebImageViewer: WebImageViewerWithContent,
  }
}
