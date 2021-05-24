import React, { useEffect } from 'react'
import ViewContext, { ContextDefaultValue } from '../Context'
import { ViewportContextProvider } from '../Context/Viewport'
import { DICOMImageViewer, DICOMImagesViewer, WebImageViewer } from '../Viewer'
import { handleError } from '../utils/common'
import { cornerstoneMessage } from '../utils/messageService/cornerstone'
import CircularProgress from '../components/CircularProgress'
import { Viewer, ContextProp, WithChildren, Viewport } from '../types'
import useFrame, { UseFrame } from './useFrame'
import useViewport, { UseViewport } from './useViewport'

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
  useViewport: UseViewport
} {
  function DICOMImageViewerWithContent({
    imageId,
    invert,
    hflip,
    vflip,
    children,
  }: WithChildren<
    {
      imageId: string
    } & Viewport
  >): JSX.Element {
    return (
      <ViewContext.Provider value={{ onError, Progress, setHeader }}>
        <ViewportContextProvider invert={invert} hflip={hflip} vflip={vflip}>
          {images.length > 1 ? (
            <DICOMImagesViewer imageId={imageId} images={images}>
              {children}
            </DICOMImagesViewer>
          ) : (
            <DICOMImageViewer imageId={imageId}>{children}</DICOMImageViewer>
          )}
        </ViewportContextProvider>
      </ViewContext.Provider>
    )
  }

  function WebImageViewerWithContent({
    imageId,
    invert,
    hflip,
    vflip,
    children,
  }: WithChildren<
    {
      imageId: string
    } & Viewport
  >): JSX.Element {
    return (
      <ViewContext.Provider value={{ onError, Progress, setHeader }}>
        <ViewportContextProvider invert={invert} hflip={hflip} vflip={vflip}>
          <WebImageViewer imageId={imageId}>{children}</WebImageViewer>
        </ViewportContextProvider>
      </ViewContext.Provider>
    )
  }

  useEffect(() => {
    cornerstoneMessage.sendMessage(true)

    return () => {
      cornerstoneMessage.sendMessage(false)
    }
  }, [])

  return {
    DICOMImageViewer: DICOMImageViewerWithContent,
    WebImageViewer: WebImageViewerWithContent,
    useFrame,
    useViewport,
  }
}
