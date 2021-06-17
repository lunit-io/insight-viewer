import { useEffect, useState } from 'react'
import {
  displayImage,
  loadImage as cornerstoneLoadImage,
} from '../utils/cornerstoneHelper'
import getHttpClient from '../utils/httpClient'
import { loadingProgressMessage } from '../utils/messageService'
import { formatViewport } from '../utils/common/formatViewport'
import useViewportUpdate from './useViewportUpdate'
import { Element, ViewerError, ViewerProp, SetViewport } from '../types'

export default function useImageLoader({
  imageId,
  element,
  setLoader,
  onError,
  requestInterceptor,
  setViewport,
}: Required<ViewerProp> & {
  element: Element
  setLoader: () => Promise<boolean>
  setViewport?: SetViewport
}): void {
  const [hasLoader, setHasLoader] = useState(false)

  // eslint-disable-next-line no-extra-semi
  ;(async function asyncLoad(): Promise<void> {
    if (!hasLoader) setHasLoader(await setLoader())
  })()

  useViewportUpdate(<HTMLDivElement>element)

  useEffect(() => {
    if (!hasLoader) return undefined
    if (!element) return undefined

    // TODO: multiframe viewer에서는 이 값이 false여야 한다.
    const isSingleImage = true

    async function loadImage(): Promise<void> {
      try {
        const image = await cornerstoneLoadImage(imageId, {
          loader: getHttpClient(isSingleImage, requestInterceptor),
        })

        if (isSingleImage) loadingProgressMessage.sendMessage(100)

        const { viewport } = displayImage(<HTMLDivElement>element, image)

        if (setViewport) setViewport(formatViewport(viewport))
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
  }, [imageId, element, hasLoader, onError, setViewport, requestInterceptor])
  return undefined
}
