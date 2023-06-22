import cornerstone, { CanvasCoordinate, EnabledElement, PixelCoordinate } from 'cornerstone-core'
import { DataSet } from 'dicom-parser'
import { CornerstoneImage, CornerstoneViewport } from './types'
import { formatCornerstoneViewport } from './formatViewport'
import { Loader } from '../../types'

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
  // Returns a default viewport for display the specified image on the specified enabled element.
  const defaultViewport = cornerstone.getDefaultViewportForImage(element, image)
  const viewport = viewportOption ? formatCornerstoneViewport(defaultViewport, viewportOption) : defaultViewport
  cornerstone.displayImage(element, image, viewport)

  return {
    viewport,
    defaultViewport,
    image,
  }
}

type LoadImage = Promise<CornerstoneImage & { data: DataSet }>

export function loadImage(imageId: string, options: { loader: Loader | undefined }): LoadImage {
  /*
    cornerstone.loadImage() 의 원래 리턴 값은 Promise<CornerstoneImage> 이지만,
    options로 인하여 data field 가 추가된 것으로 보임
  */

  const cornerstoneImage = cornerstone.loadImage(imageId, options) as LoadImage
  return cornerstoneImage
}

export function getViewport(element: HTMLDivElement): ReturnType<typeof cornerstone.getViewport> {
  return cornerstone.getViewport(element)
}

export function setViewport(
  element: HTMLDivElement,
  viewport: cornerstone.Viewport
): ReturnType<typeof cornerstone.setViewport> {
  return cornerstone.setViewport(element, viewport)
}

export function getEnabledElement(element: HTMLElement): ReturnType<typeof cornerstone.getEnabledElement> {
  return cornerstone.getEnabledElement(element)
}

export function setToPixelCoordinateSystem(
  element: EnabledElement,
  context: CanvasRenderingContext2D
): ReturnType<typeof cornerstone.setToPixelCoordinateSystem> {
  return cornerstone.setToPixelCoordinateSystem(element, context)
}

export function pixelToCanvas(element: HTMLElement, points: PixelCoordinate): CanvasCoordinate {
  return cornerstone.pixelToCanvas(element, points)
}

export function getDefaultViewportForImage(
  element: HTMLDivElement,
  image: CornerstoneImage
): ReturnType<typeof cornerstone.getDefaultViewportForImage> {
  return cornerstone.getDefaultViewportForImage(element, image)
}

export function pageToPixel(element: HTMLElement, pageX: number, pageY: number): PixelCoordinate {
  return cornerstone.pageToPixel(element, pageX, pageY)
}
