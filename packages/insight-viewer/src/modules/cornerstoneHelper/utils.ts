/* eslint-disable @typescript-eslint/no-var-requires */
const cornerstone = require('cornerstone-core')

export function init(element: HTMLDivElement): void {
  cornerstone.enable(element)
}

export function dispose(element: HTMLDivElement): void {
  cornerstone.disable(element)
}

export function resize(element: HTMLDivElement): void {
  cornerstone.resize(element)
}

export function displayImage(
  element: HTMLDivElement,
  image: unknown,
  viewport: unknown,
): ReturnType<typeof cornerstone.displayImage> {
  return cornerstone.displayImage(element, image, viewport)
}

export function loadImage(
  imageId: string
): ReturnType<typeof cornerstone.loadImage> {
  return cornerstone.loadImage(imageId)
}

export function getDefaultViewportForImage(
  element: HTMLDivElement,
  imageId: string
): ReturnType<typeof cornerstone.getDefaultViewportForImage> {
  return cornerstone.getDefaultViewportForImage(element, imageId)
}
