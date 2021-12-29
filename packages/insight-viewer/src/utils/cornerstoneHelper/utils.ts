import cornerstone, {
  CanvasCoordinate,
  EnabledElement,
  PixelCoordinate,
} from 'cornerstone-core'
import { CornerstoneImage, CornerstoneViewport } from './types'
import { formatCornerstoneViewport } from '../common/formatViewport'

export function enable(element: HTMLDivElement): void {
  cornerstone.enable(element)
}

export function disable(element: HTMLDivElement): void {
  cornerstone.disable(element)
}

export function resize(element: HTMLDivElement): void {
  cornerstone.resize(element)
}

export function getCornerstone(): typeof cornerstone {
  return cornerstone
}

export function displayImage(
  element: HTMLDivElement,
  image: CornerstoneImage,
  viewportOption?: cornerstone.Viewport
): {
  viewport: CornerstoneViewport
  defaultViewport: CornerstoneViewport
  image: CornerstoneImage
} {
  const defaultViewport = cornerstone.getDefaultViewportForImage(element, image)
  const viewport = viewportOption
    ? formatCornerstoneViewport(defaultViewport, viewportOption)
    : defaultViewport
  cornerstone.displayImage(element, image, viewport)

  return {
    viewport,
    defaultViewport,
    image,
  }
}

export function loadImage(
  imageId: string,
  options?: Record<string, unknown>
): ReturnType<typeof cornerstone.loadImage> {
  return cornerstone.loadImage(imageId, options)
}

export function getViewport(
  element: HTMLDivElement
): ReturnType<typeof cornerstone.getViewport> {
  return cornerstone.getViewport(element)
}

export function setViewport(
  element: HTMLDivElement,
  viewport: cornerstone.Viewport
): ReturnType<typeof cornerstone.setViewport> {
  return cornerstone.setViewport(element, viewport)
}

export function getEnabledElement(
  element: HTMLElement
): ReturnType<typeof cornerstone.getEnabledElement> {
  return cornerstone.getEnabledElement(element)
}

export function setToPixelCoordinateSystem(
  element: EnabledElement,
  context: CanvasRenderingContext2D
): ReturnType<typeof cornerstone.setToPixelCoordinateSystem> {
  return cornerstone.setToPixelCoordinateSystem(element, context)
}

export function pixelToCanvas(
  element: HTMLElement,
  points: PixelCoordinate
): CanvasCoordinate {
  return cornerstone.pixelToCanvas(element, points)
}
