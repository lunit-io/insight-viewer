/* eslint-disable @typescript-eslint/no-var-requires */
const cornerstone = require('cornerstone-core')
const dicomParser = require('dicom-parser')
const cornerstoneWADOImageLoader = require('cornerstone-wado-image-loader')

function init() {
  cornerstoneWADOImageLoader.external.cornerstone = cornerstone
  cornerstoneWADOImageLoader.external.dicomParser = dicomParser
}

export async function loadImage(
  element: HTMLDivElement,
  imageId: string
): Promise<void> {
  init()

  const image = await cornerstone.loadImage(imageId)
  const viewport = cornerstone.getDefaultViewportForImage(element, image)
  cornerstone.displayImage(element, image, viewport)
}
