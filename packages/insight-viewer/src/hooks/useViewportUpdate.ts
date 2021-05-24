import { useEffect, useContext } from 'react'
import { getViewport, setViewport } from '../utils/cornerstoneHelper'
import ViewportContext, {
  ViewrportContextDefaultValue,
} from '../Context/Viewport'

export default function useViewportUpdate(
  element: HTMLDivElement | null
): void {
  const { invert, hflip, vflip } = useContext(ViewportContext)

  useEffect(() => {
    if (!element) return undefined

    const viewport = getViewport(element)
    if (!viewport) return undefined
    setViewport(element, {
      ...viewport,
      invert: invert ?? ViewrportContextDefaultValue.invert,
      hflip: hflip ?? ViewrportContextDefaultValue.hflip,
      vflip: vflip ?? ViewrportContextDefaultValue.vflip,
    })
    return undefined
  }, [element, invert, hflip, vflip])
}
