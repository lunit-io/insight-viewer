import { useEffect, useRef } from 'react'
import {
  displayImage,
  loadImage as cornerstoneLoadImage,
} from '../utils/cornerstoneHelper'
import getHttpClient from '../utils/httpClient'
import {
  loadingProgressMessage,
  initialViewportMessage,
} from '../utils/messageService'
import { formatViewport } from '../utils/common/formatViewport'
import {
  Element,
  Viewport,
  ViewerError,
  ViewerProp,
  OnViewportChange,
} from '../types'

export default function useImageLoadAndDisplay({
  imageId,
  element,
  hasLoader,
  onError,
  requestInterceptor,
  onViewportChange,
  viewportRef,
}: Required<ViewerProp> & {
  element: Element
  hasLoader: boolean
  viewportRef?: React.MutableRefObject<Viewport | undefined>
  onViewportChange?: OnViewportChange
}): void {
  const loadCountRef = useRef(0)

  useEffect(() => {
    if (!hasLoader) return undefined
    if (!element) return undefined

    // determine whether it is first load or subsequent load(multiframe viewer)
    loadCountRef.current += 1

    async function loadAndDisplayImage(): Promise<void> {
      try {
        const image = await cornerstoneLoadImage(imageId, {
          loader: getHttpClient(requestInterceptor),
        })

        const { viewport, defaultViewport } = displayImage(
          <HTMLDivElement>element,
          image,
          loadCountRef.current === 1
            ? viewportRef?.current?._default
            : viewportRef?.current
        )
        // This is for no content-length gzip image. Normally, meaningless.
        loadingProgressMessage.sendMessage(100)
        initialViewportMessage.sendMessage(defaultViewport)

        if (onViewportChange) {
          onViewportChange(formatViewport(viewport))
        }
      } catch (e) {
        /**
         * ky HTTPError
         * https://github.com/sindresorhus/ky/blob/main/source/errors/HTTPError.ts
         * { error: { name: 'HTTPError', options, request, response, message, stack }
         */
        const err: ViewerError = new Error(e?.error?.message ?? e.message)
        err.status = e?.error?.response?.status
        onError(err)
      }
    }

    loadAndDisplayImage()
    return undefined
  }, [
    imageId,
    element,
    hasLoader,
    onError,
    onViewportChange,
    requestInterceptor,
    viewportRef,
  ])
}
