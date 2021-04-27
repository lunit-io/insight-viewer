/* eslint-disable @typescript-eslint/no-var-requires */
import { useEffect } from 'react'
import {
  init,
  dispose,
  displayImage,
  loadImage as cornerstoneLoadImage,
  getDefaultViewportForImage
} from './utils'
import { ViewerType } from '../../types'

const cornerstone = require('cornerstone-core')

interface Prop {
  imageId: string
  type?: ViewerType
  ref: React.RefObject<HTMLDivElement>
}

function wadoInit() {
  // eslint-disable-next-line global-require
  const cornerstoneWADOImageLoader = require('cornerstone-wado-image-loader')
  // eslint-disable-next-line global-require
  const dicomParser = require('dicom-parser')

  cornerstoneWADOImageLoader.external.cornerstone = cornerstone
  cornerstoneWADOImageLoader.external.dicomParser = dicomParser
}

function webImageInit() {
  // eslint-disable-next-line global-require
  const cornerstoneWebImageLoader = require('cornerstone-web-image-loader')
  cornerstoneWebImageLoader.external.cornerstone = cornerstone
}

const initImageLoaderMap = {
  wado: wadoInit,
  web: webImageInit,
}

export const useLoadImage = ({ imageId, ref, type = 'wado' }: Prop): void => {
  useEffect(() => {
    if (!ref || !ref.current) return undefined
    const element = ref.current
    init(element)

    return () => {
      dispose(element)
    }
  }, [ref, type])

  useEffect(() => {
    initImageLoaderMap[type]()
  }, [type])

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
