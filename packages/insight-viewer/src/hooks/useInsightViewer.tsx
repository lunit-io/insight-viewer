import React from 'react'
import LoaderContext, { ContextDefaultValue } from '../Context'
import { DICOMImageViewer, DICOMImagesViewer, WebImageViewer } from '../Viewer'
import { handleError } from '../utils/common'
import { viewportMessage, multiframeMessage } from '../utils/messageService'
import CircularProgress from '../components/CircularProgress'
import { Viewer, MultiframeViewer, ContextProp, WithChildren } from '../types'

export default function useInsightViewer(
  {
    onError = handleError,
    Progress = CircularProgress,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setHeader = _request => {},
  }: Partial<ContextProp> = {
    ...ContextDefaultValue,
  }
): {
  DICOMImageViewer: Viewer
  DICOMImagesViewer: MultiframeViewer
  WebImageViewer: Viewer
  setViewport: typeof viewportMessage.sendMessage
  setFrame: typeof multiframeMessage.sendMessage
} {
  function DICOMImageViewerWithContent({
    imageId,
    children,
  }: WithChildren<{
    imageId: string
  }>): JSX.Element {
    return (
      <LoaderContext.Provider value={{ onError, Progress, setHeader }}>
        <DICOMImageViewer imageId={imageId}>{children}</DICOMImageViewer>
      </LoaderContext.Provider>
    )
  }

  function DICOMImagesViewerWithContent({
    imageIds = [],
    initial = 0,
    children,
  }: WithChildren<{
    imageIds: string[]
    initial?: number
  }>): JSX.Element {
    return (
      <LoaderContext.Provider value={{ onError, Progress, setHeader }}>
        <DICOMImagesViewer imageIds={imageIds} initial={initial}>
          {children}
        </DICOMImagesViewer>
      </LoaderContext.Provider>
    )
  }

  function WebImageViewerWithContent({
    imageId,
    children,
  }: WithChildren<{
    imageId: string
  }>): JSX.Element {
    return (
      <LoaderContext.Provider value={{ onError, Progress, setHeader }}>
        <WebImageViewer imageId={imageId}>{children}</WebImageViewer>
      </LoaderContext.Provider>
    )
  }

  return {
    DICOMImageViewer: DICOMImageViewerWithContent,
    DICOMImagesViewer: DICOMImagesViewerWithContent,
    WebImageViewer: WebImageViewerWithContent,
    setViewport: viewportMessage.sendMessage,
    setFrame: multiframeMessage.sendMessage,
  }
}
