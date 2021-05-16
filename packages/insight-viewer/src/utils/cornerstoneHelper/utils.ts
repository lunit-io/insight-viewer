import cornerstone from 'cornerstone-core'

export function init(element: HTMLDivElement): void {
  cornerstone.enable(element)
}

export function dispose(element: HTMLDivElement): void {
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
  image: cornerstone.Image,
  viewport: cornerstone.Viewport
): ReturnType<typeof cornerstone.displayImage> {
  return cornerstone.displayImage(element, image, viewport)
}

export function loadImage(
  imageId: string,
  options?: Record<string, unknown>
): ReturnType<typeof cornerstone.loadImage> {
  return cornerstone.loadImage(imageId, options)
}

export function getDefaultViewportForImage(
  element: HTMLDivElement,
  image: cornerstone.Image
): ReturnType<typeof cornerstone.getDefaultViewportForImage> {
  return cornerstone.getDefaultViewportForImage(element, image)
}

export type Image = cornerstone.Image
