import React from 'react'
import ViewContext, { ContextDefaultValue } from '../Viewer/Context'
import { DICOMImageViewer, WebImageViewer } from '../Viewer'
import { handleError } from '../utils/common'
import CircularProgress from '../components/CircularProgress'
import { Viewer, ContextProp } from '../types'
import {
  curriedUseMultiframe,
  ReturnCurriedUseMultiframe,
} from './useMultiframe'

export default function useInsightViewer({
  onError = handleError,
  Progress = CircularProgress,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setHeader = _request => {},
  images = [],
}: ContextProp = ContextDefaultValue): {
  DICOMImageViewer: Viewer
  WebImageViewer: Viewer
  useMultiframe: ReturnCurriedUseMultiframe
} {
  const DICOMImageViewerWithContent: Viewer = ({ imageId }) => (
    <ViewContext.Provider value={{ onError, Progress, setHeader, images }}>
      <DICOMImageViewer imageId={imageId} />
    </ViewContext.Provider>
  )

  const WebImageViewerWithContent: Viewer = ({ imageId }) => (
    <ViewContext.Provider value={{ onError, Progress, setHeader, images }}>
      <WebImageViewer imageId={imageId} />
    </ViewContext.Provider>
  )

  return {
    DICOMImageViewer: DICOMImageViewerWithContent,
    WebImageViewer: WebImageViewerWithContent,
    useMultiframe: curriedUseMultiframe(images),
  }
}
