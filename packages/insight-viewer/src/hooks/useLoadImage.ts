import { useEffect, useState } from 'react'
import {
  displayImage,
  loadImage as cornerstoneLoadImage,
  getDefaultViewportForImage,
} from '../utils/cornerstoneHelper'
import { handleError } from '../utils/common'
import httpClient from '../utils/httpClient'
import { errorMessage } from '../utils/messageService'

interface Prop {
  imageId: string
  element: HTMLDivElement | null
  setLoader: () => Promise<boolean>
}

export default function useLoadImage({
  imageId,
  element,
  setLoader,
}: Prop): boolean {
  const [hasLoader, setHasLoader] = useState(false)

  // eslint-disable-next-line no-extra-semi
  ;(async function asyncLoad(): Promise<undefined> {
    if (hasLoader) return undefined
    setHasLoader(await setLoader())
    return undefined
  })()

  useEffect(() => {
    if (!hasLoader) return undefined
    if (!element) return undefined

    async function loadImage(): Promise<void> {
      try {
        const image = await cornerstoneLoadImage(imageId, {
          loader: httpClient,
        })
        const viewport = getDefaultViewportForImage(
          <HTMLDivElement>element,
          image
        )

        displayImage(<HTMLDivElement>element, image, viewport)
      } catch (e) {
        /**
         * e
         * https://github.com/sindresorhus/ky/blob/main/source/errors/HTTPError.ts
         * { error: { name: 'HTTPError', options, request, response, message, stack }
         */
        errorMessage.sendMessage(e?.error?.message || 'An error has occured!')
        handleError(e)
      }
    }

    loadImage()
  }, [imageId, element, hasLoader])
  return hasLoader
}
