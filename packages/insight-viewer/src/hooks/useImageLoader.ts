import { useEffect, useState } from 'react'
import {
  displayImage,
  loadImage as cornerstoneLoadImage,
} from '../utils/cornerstoneHelper'
import getHttpClient from '../utils/httpClient'
import { loadingProgressMessage } from '../utils/messageService'
import { formatViewport } from '../utils/common/formatViewport'
import { Element, ViewerError, ViewerProp, OnViewportChange } from '../types'
import { Viewport } from '../Context/Viewport/types'

export default function useImageLoader({
  imageId,
  element,
  setLoader,
  onError,
  requestInterceptor,
  onViewportChange,
  initialViewportRef,
}: Required<ViewerProp> & {
  element: Element
  setLoader: () => Promise<boolean>
  initialViewportRef?: React.MutableRefObject<Partial<Viewport> | undefined>
  onViewportChange?: OnViewportChange
}): void {
  const [hasLoader, setHasLoader] = useState(false)

  // eslint-disable-next-line no-extra-semi
  ;(async function asyncLoad(): Promise<void> {
    if (!hasLoader) setHasLoader(await setLoader())
  })()

  useEffect(() => {
    if (!hasLoader) return undefined
    if (!element) return undefined

    async function loadImage(): Promise<void> {
      try {
        const image = await cornerstoneLoadImage(imageId, {
          loader: getHttpClient(requestInterceptor),
        })
        loadingProgressMessage.sendMessage(100)

        const { viewport } = displayImage(<HTMLDivElement>element, image)

        if (onViewportChange) {
          const formatted = formatViewport(viewport)

          onViewportChange(
            initialViewportRef?.current
              ? { ...formatted, ...initialViewportRef?.current }
              : formatted
          )
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

    loadImage()
    return undefined
  }, [
    imageId,
    element,
    hasLoader,
    onError,
    onViewportChange,
    requestInterceptor,
    initialViewportRef,
  ])
  return undefined
}
