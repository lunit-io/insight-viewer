import { useEffect, useState, useRef } from 'react'
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

export default function useImageLoader({
  imageId,
  element,
  setLoader,
  onError,
  requestInterceptor,
  onViewportChange,
  viewportRef,
}: Required<ViewerProp> & {
  element: Element
  setLoader: () => Promise<boolean>
  viewportRef?: React.MutableRefObject<Viewport | undefined>
  onViewportChange?: OnViewportChange
}): void {
  const [hasLoader, setHasLoader] = useState(false)
  const loadCountRef = useRef(0)

  // eslint-disable-next-line no-extra-semi
  ;(async function asyncLoad(): Promise<void> {
    if (!hasLoader) setHasLoader(await setLoader())
  })()

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
        // This is for no content-length gzip image. Normally meaningless.
        loadingProgressMessage.sendMessage(100)

        const { viewport, defaultViewport } = displayImage(
          <HTMLDivElement>element,
          image,
          loadCountRef.current === 1
            ? // eslint-disable-next-line no-underscore-dangle
              viewportRef?.current?._initial
            : viewportRef?.current
        )
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
