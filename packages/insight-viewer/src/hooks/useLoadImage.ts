import { useEffect } from 'react'
import { 
  displayImage,
  loadImage as cornerstoneLoadImage,
  getDefaultViewportForImage
} from '../modules/cornerstoneHelper'

export default function useLoadImage(
  imageId: string, 
  ref: React.RefObject<HTMLDivElement>
): void {
  useEffect(() => {
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
  }, [imageId, ref])
}
