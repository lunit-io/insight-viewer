import { useEffect, useState } from 'react'
import { Subscription } from 'rxjs'
import { first } from 'rxjs/operators'
import {
  displayImage,
  loadImage as cornerstoneLoadImage,
} from '../utils/cornerstoneHelper'
import getHttpClient from '../utils/httpClient'
import {
  loadingProgressMessage,
  shouldSetInitialViewportMessage,
} from '../utils/messageService'
import { formatViewport } from '../utils/common/formatViewport'
import useViewportUpdate from './useViewportUpdate'
import { Element, ViewerError, ViewerProp, OnViewportChange } from '../types'
import { Viewport } from '../Context/Viewport/types'

let subscription: Subscription
let initialViewport: Viewport | undefined

export default function useImageLoader({
  imageId,
  element,
  setLoader,
  onError,
  requestInterceptor,
  onViewportChange,
  viewport: initial,
}: Required<ViewerProp> & {
  element: Element
  setLoader: () => Promise<boolean>
  viewport?: Viewport
  onViewportChange?: OnViewportChange
}): void {
  const [hasLoader, setHasLoader] = useState(false)
  const [shouldSetInitialViewport, setShouldSetInitialViewport] = useState(
    false
  )
  initialViewport = initial

  // eslint-disable-next-line no-extra-semi
  ;(async function asyncLoad(): Promise<void> {
    if (!hasLoader) setHasLoader(await setLoader())
  })()

  useViewportUpdate(<HTMLDivElement>element)

  useEffect(() => {
    subscription = shouldSetInitialViewportMessage
      .getMessage()
      .pipe(first())
      .subscribe(() => {
        setShouldSetInitialViewport(true)
      })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

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

        if (onViewportChange)
          onViewportChange(
            formatViewport(
              shouldSetInitialViewport
                ? { ...viewport, ...initialViewport }
                : viewport
            )
          )
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
    shouldSetInitialViewport,
  ])
  return undefined
}
