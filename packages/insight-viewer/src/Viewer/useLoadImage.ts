/* eslint-disable @typescript-eslint/no-var-requires */
import { useEffect } from 'react'
import { init, dispose } from '../modules/cornerstoneHelper'
import { ViewerType } from '../types'

const cornerstone = require('cornerstone-core')

interface Prop {
  imageId?: string
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

const initMap = {
  wado: wadoInit,
  web: webImageInit,
}

const useLoadImage = ({ imageId, ref, type = 'wado' }: Prop): void => {
  useEffect(() => {
    if (!imageId) return undefined
    if (!ref || !ref.current) return undefined
    const element = { ...ref.current }

    async function loadImage(): Promise<void> {
      initMap[type]()

      const image = await cornerstone.loadImage(imageId)
      const viewport = cornerstone.getDefaultViewportForImage(
        ref.current,
        image
      )
      cornerstone.displayImage(ref.current, image, viewport)
    }

    init(ref.current)
    loadImage()

    return () => {
      dispose(element)
    }
  }, [imageId, ref, type])
}

export default useLoadImage
