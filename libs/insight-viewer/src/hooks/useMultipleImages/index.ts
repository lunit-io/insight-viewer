/**
 * @fileoverview Loads images(Dicom/Web) and return the loaded images and loading states of them.
 */
import { useRef, useEffect } from 'react'
import { CONFIG } from '../../const'
import { HTTP, ImageId } from '../../types'
import { noop } from '../../utils/common'
import { useLoadImages } from './useLoadImages'
import { ImagesLoadState, OnImagesLoaded } from './types'

interface UseMultipleImages {
  (props: Partial<HTTP> & ImageId & { onImagesLoaded?: OnImagesLoaded; timeout?: number }): ImagesLoadState
}

/**
 * @param rest wadouri | dicomfile | web
 * @param requestInterceptor The callback is called before a request is sent.
 *  It uses ky.js beforeRequest hook.
 * @param onError The error handler.
 * @returns <{ image, loadingStates }> image is a CornerstoneImage.
 *  loadingStates are each image's <'initial'|'loading'|'success'|'fail'>
 */
export const useMultipleImages: UseMultipleImages = ({
  requestInterceptor = CONFIG.requestInterceptor,
  onError = CONFIG.onError,
  timeout = CONFIG.timeout,
  onImagesLoaded = noop,
  ...rest
}) => {
  const onImagesLoadedRef = useRef<OnImagesLoaded>()

  const { loadingStates, images: loadedImages = [] } = useLoadImages({
    ...rest,
    onError,
    requestInterceptor,
    timeout,
    onImagesLoaded: onImagesLoadedRef.current,
  })

  useEffect(() => {
    if (onImagesLoadedRef?.current) return
    onImagesLoadedRef.current = onImagesLoaded
  }, [onImagesLoaded])

  return {
    loadingStates,
    images: loadedImages,
  }
}
