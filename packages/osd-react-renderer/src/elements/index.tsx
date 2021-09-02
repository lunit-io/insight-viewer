import InvalidElement from './InvalidElement'
import TiledImage from './TiledImage'
import Viewport from './Viewport'
import Base from './Base'
import Root from './Root'
import Scalebar from './Scalebar'
import CanvasOverlay from './CanvasOverlay'
import TooltipOverlay from './TooltipOverlay'

const ElementConstructors = {
  tiledImage: TiledImage,
  viewport: Viewport,
  scalebar: Scalebar,
  canvasOverlay: CanvasOverlay,
  tooltipOverlay: TooltipOverlay,
  root: Root,
}

function createInstance(
  element: { type: string; props: {} },
  root: Base
): Base {
  const { type, props = {} } = element
  const ElementConstructor =
    ElementConstructors[type as keyof typeof ElementConstructors] ||
    InvalidElement
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return new ElementConstructor(root.viewer, props as any)
}
export { createInstance }
