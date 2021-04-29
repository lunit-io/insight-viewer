import { useEffect, useState } from 'react'
import {
  displayImage,
  loadImage as cornerstoneLoadImage,
  getDefaultViewportForImage,
} from '../utils/cornerstoneHelper'

interface Prop {
  imageId: string
  element: HTMLDivElement | null
  setLoader: () => Promise<boolean>
}

export default function useLoadImage({
  imageId,
  element,
  setLoader,
}: Prop): void {
  const [hasLoader, setHasLoader] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line no-extra-semi
    ;(async function asyncLoad(): Promise<undefined> {
      if (hasLoader) return undefined
      setHasLoader(await setLoader())
      return undefined
    })()
  }, [setLoader, hasLoader])

  useEffect(() => {
    if (!hasLoader) return undefined
    if (!element) return undefined

    async function loadImage(): Promise<void> {
      const image = await cornerstoneLoadImage(imageId)
      const viewport = getDefaultViewportForImage(
        <HTMLDivElement>element,
        image
      )

      displayImage(<HTMLDivElement>element, image, viewport)
    }

    loadImage()
    return undefined
  }, [imageId, element, hasLoader])
}
