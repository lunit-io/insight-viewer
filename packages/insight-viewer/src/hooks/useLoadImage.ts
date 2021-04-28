import { useEffect, useState } from 'react'
import { 
  displayImage,
  loadImage as cornerstoneLoadImage,
  getDefaultViewportForImage
} from '../utils/cornerstoneHelper'

interface Prop {
  imageId: string
  ref: React.RefObject<HTMLDivElement>
  setLoader: () => Promise<boolean>
}

export default function useLoadImage({
  imageId, 
  ref,
  setLoader
}: Prop): void {
  const [hasLoader, setHasLoader] = useState(false)

  useEffect(() => {
    (async function asyncLoad(): Promise<undefined> {
      if (hasLoader) return undefined
      setHasLoader(await setLoader())
      return undefined
    })()
  }, [setLoader, hasLoader])

  useEffect(() => {
    if (!hasLoader) return undefined
    if (!ref || !ref.current) return undefined
    const element = ref.current

    async function loadImage(): Promise<void> {
      const image = await cornerstoneLoadImage(imageId)
      const viewport = getDefaultViewportForImage(
        element,
        image
      )

      displayImage(element, image, viewport)
    }

    loadImage()
    return undefined
  }, [imageId, ref, hasLoader])
}
