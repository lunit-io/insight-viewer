import React from 'react'
import ViewContext, { ContextDefaultValue } from '../Viewer/Context'
import { DICOMImageViewer, DICOMImagesViewer, WebImageViewer } from '../Viewer'
import { handleError } from '../utils/common'
import CircularProgress from '../components/CircularProgress'
import { Viewer, ContextProp, WithChildren } from '../types'
import useFrame, { UseFrame } from './useFrame'

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
  useFrame: UseFrame
} {
  function DICOMImageViewerWithContent({
    imageId,
    children,
  }: WithChildren<{
    imageId: string
  }>): JSX.Element {
    return (
      <ViewContext.Provider value={{ onError, Progress, setHeader }}>
        {images.length > 1 ? (
          <DICOMImagesViewer imageId={imageId} images={images}>
            {children}
          </DICOMImagesViewer>
        ) : (
          <DICOMImageViewer imageId={imageId}>{children}</DICOMImageViewer>
        )}
      </ViewContext.Provider>
    )
  }

  function WebImageViewerWithContent({
    imageId,
    children,
  }: WithChildren<{
    imageId: string
  }>): JSX.Element {
    return (
      <ViewContext.Provider value={{ onError, Progress, setHeader }}>
        <WebImageViewer imageId={imageId}>{children}</WebImageViewer>
      </ViewContext.Provider>
    )
  }

  return {
    DICOMImageViewer: DICOMImageViewerWithContent,
    WebImageViewer: WebImageViewerWithContent,
    useFrame,
  }
}
