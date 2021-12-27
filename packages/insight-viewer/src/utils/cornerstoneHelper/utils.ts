import cornerstone from 'cornerstone-core'
import {
  CornerstoneImage,
  CornerstoneViewport,
  CornerstoneViewportParam,
} from './types'
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
  viewportOption?: CornerstoneViewportParam // [viewport] A set of Cornerstone viewport parameters
): {
  viewport: CornerstoneViewport
  defaultViewport: CornerstoneViewport
  image: CornerstoneImage
} {
  // Returns a default viewport for display the specified image on the specified enabled element.
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
  viewport: CornerstoneViewportParam
): ReturnType<typeof cornerstone.setViewport> {
  return cornerstone.setViewport(element, viewport)
}

export function getDefaultViewportForImage(
  element: HTMLDivElement,
  image: CornerstoneImage
): ReturnType<typeof cornerstone.getDefaultViewportForImage> {
  return cornerstone.getDefaultViewportForImage(element, image)
}
