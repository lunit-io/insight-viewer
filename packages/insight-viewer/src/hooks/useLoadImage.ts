import { useEffect, useState, useContext } from 'react'
import {
  displayImage,
  loadImage as cornerstoneLoadImage,
  getDefaultViewportForImage,
} from '../utils/cornerstoneHelper'
import getHttpClient from '../utils/httpClient'
import { loadingProgressMessage } from '../utils/messageService'
import ViewContext from '../Viewer/Context'

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
  const { onError, setHeader, images } = useContext(ViewContext)
  const isSingleImage = images.length === 0

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
          loader: getHttpClient(isSingleImage, setHeader),
        })

        if (isSingleImage) loadingProgressMessage.sendMessage(100)

        const viewport = getDefaultViewportForImage(
          <HTMLDivElement>element,
          image
        )

        displayImage(<HTMLDivElement>element, image, viewport)
      } catch (e) {
        /**
         * ky HTTPError
         * https://github.com/sindresorhus/ky/blob/main/source/errors/HTTPError.ts
         * { error: { name: 'HTTPError', options, request, response, message, stack }
         */
        onError(new Error(e?.error?.message || e.message))
      }
    }

    loadImage()
    return undefined
  }, [imageId, element, isSingleImage, hasLoader, onError, setHeader])
  return hasLoader
}
