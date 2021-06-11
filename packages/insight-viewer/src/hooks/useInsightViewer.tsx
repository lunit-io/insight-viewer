import React from 'react'
import LoaderContext, { ContextDefaultValue } from '../Context'
import { DICOMImageViewer, DICOMImagesViewer, WebImageViewer } from '../Viewer'
import { handleError } from '../utils/common'
import { viewportMessage } from '../utils/messageService'
import CircularProgress from '../components/CircularProgress'
import { Viewer, ContextProp, WithChildren } from '../types'
import usePrefetch from './usePrefetch'

export default function useInsightViewer(
  {
    onError = handleError,
    Progress = CircularProgress,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setHeader = _request => {},
    images = [],
  }: Partial<ContextProp> & {
    images?: string[]
  } = {
    ...ContextDefaultValue,
    images: [],
  }
): {
  DICOMImageViewer: Viewer
  WebImageViewer: Viewer
  setViewport: typeof viewportMessage.sendMessage
} {
  function DICOMImageViewerWithContent({
    imageId,
    children,
  }: WithChildren<{
    imageId: string
  }>): JSX.Element {
    return (
      <LoaderContext.Provider value={{ onError, Progress, setHeader }}>
        {images.length > 1 ? (
          <DICOMImagesViewer imageId={imageId}>{children}</DICOMImagesViewer>
        ) : (
          <DICOMImageViewer imageId={imageId}>{children}</DICOMImageViewer>
        )}
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

  usePrefetch(images)

  return {
    DICOMImageViewer: DICOMImageViewerWithContent,
    WebImageViewer: WebImageViewerWithContent,
    setViewport: viewportMessage.sendMessage,
  }
}
