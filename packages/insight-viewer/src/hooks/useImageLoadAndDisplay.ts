import React, { useEffect, useRef, useState } from 'react'
import {
  displayImage,
  loadImage as cornerstoneLoadImage,
} from '../utils/cornerstoneHelper'
import { CornerstoneViewport } from '../utils/cornerstoneHelper/types'
import getHttpClient from '../utils/httpClient'
import {
  loadingProgressMessage,
  initialViewportMessage,
} from '../utils/messageService'
import { formatViewport } from '../utils/common/formatViewport'
import { formatError } from '../utils/common'
import {
  Element,
  Viewport,
  ViewerProp,
  OnViewportChange,
  RequestInterceptor,
  BasicViewport,
} from '../types'

type Prop = Required<ViewerProp> & {
  element: Element
  viewportRef?: React.MutableRefObject<Viewport | undefined>
  onViewportChange?: OnViewportChange
}

type ImageViewport = Promise<{
  viewport: CornerstoneViewport
  defaultViewport: CornerstoneViewport
}>

type DefaultImageViewport = (arg: {
  imageId: string
  element: Element
  requestInterceptor: RequestInterceptor
  option: Partial<BasicViewport> | undefined
}) => ImageViewport

export type GetImageViewport = DefaultImageViewport | (() => ImageViewport)

/**
 * Load and display image with corenrstone.js.
 * If successful, return viewport data.
 * If not successful, return error.
 */
const _getImageViewport: GetImageViewport = async ({
  imageId,
  element,
  requestInterceptor,
  option,
}) => {
  try {
    const image = await cornerstoneLoadImage(imageId, {
      loader: getHttpClient(requestInterceptor),
    })
    const { viewport, defaultViewport } = displayImage(
      <HTMLDivElement>element,
      image,
      option
    )
    return { viewport, defaultViewport }
  } catch (e) {
    throw formatError(e)
  }
}

/**
 * Initialize viewport and handle loading state after loading and displaying image.
 * If successful, return true. It works well.
 * If not successful, return false. It calls onError.
 * getImageViewport is pluggable for unit test.
 */
export async function loadAndDisplayImage({
  imageId,
  element,
  requestInterceptor,
  onViewportChange,
  loadCountRef,
  viewportRef,
  onError,
  getImageViewport = _getImageViewport,
}: Prop & {
  loadCountRef: React.MutableRefObject<number>
  getImageViewport?: GetImageViewport
}): Promise<boolean> {
  try {
    const imageViewport = await getImageViewport({
      imageId,
      element,
      requestInterceptor,
      option:
        loadCountRef.current === 1
          ? viewportRef?.current?._default
          : viewportRef?.current,
    })
    const { viewport, defaultViewport } = imageViewport
    loadingProgressMessage.sendMessage(100)
    initialViewportMessage.sendMessage(defaultViewport)

    if (onViewportChange) {
      onViewportChange(formatViewport(viewport))
    }
    return true
  } catch (e) {
    onError(e)
    return false
  }
}

export default function useImageLoadAndDisplay(
  prop: Prop & {
    setLoader: () => Promise<boolean>
  }
): void {
  const loadCountRef = useRef(0)
  const [hasLoader, setHasLoader] = useState(false)
  const {
    element,
    imageId,
    viewportRef,
    setLoader,
    onError,
    requestInterceptor,
    onViewportChange,
  } = prop

  // eslint-disable-next-line no-extra-semi
  ;(async function asyncLoad(): Promise<void> {
    if (!hasLoader) setHasLoader(await setLoader())
  })()

  useEffect(() => {
    if (!hasLoader || !element) return

    // Determine whether it is first load or subsequent load(multiframe viewer)
    loadCountRef.current += 1

    loadAndDisplayImage({
      element,
      imageId,
      viewportRef,
      onError,
      requestInterceptor,
      onViewportChange,
      loadCountRef,
    })
  }, [
    element,
    imageId,
    hasLoader,
    viewportRef,
    onError,
    requestInterceptor,
    onViewportChange,
  ])
}
