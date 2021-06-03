import { loadImage, displayImage } from './utils'
import getHttpClient from '../httpClient'
import { loadingProgressMessage } from '../messageService/loadingProgress'
import { Element, OnError, SetHeader } from '../../types'

interface Prop {
  imageId: string
  element: Element
  onError: OnError
  setHeader: SetHeader
  isSingleImage: boolean
}

export default async function loadAndDisplayImage({
  imageId,
  element,
  onError,
  setHeader,
  isSingleImage,
}: Prop): Promise<void> {
  try {
    const image = await loadImage(imageId, {
      loader: getHttpClient(isSingleImage, setHeader),
    })

    if (isSingleImage) loadingProgressMessage.sendMessage(100)

    displayImage(<HTMLDivElement>element, image)
  } catch (e) {
    /**
     * ky HTTPError
     * https://github.com/sindresorhus/ky/blob/main/source/errors/HTTPError.ts
     * { error: { name: 'HTTPError', options, request, response, message, stack }
     */
    onError(new Error(e?.error?.message || e.message))
  }
}
