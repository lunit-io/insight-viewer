/**
 * @fileoverview Loads images(Dicom/Web) and return the loaded images and loading states of them.
 */
import { useLoadImages } from './useLoadImages'

import { CONFIG } from '../../const'
import { HTTP, ImageTypes } from '../../types'
import { ImagesLoadState } from './types'

interface UseMultiframeImages {
  (props: Partial<HTTP> & ImageTypes): ImagesLoadState
}

/**
 * @param rest wadouri | dicomfile | web
 * @param requestInterceptor The callback is called before a request is sent.
 *  It uses ky.js beforeRequest hook.
 * @param onError The error handler.
 * @returns <{ image, loadingStates }> image is a CornerstoneImage.
 *  loadingStates are each image's <'initial'|'loading'|'success'|'fail'>
 */
export const useMultipleImages: UseMultiframeImages = ({
  requestInterceptor = CONFIG.requestInterceptor,
  onError = CONFIG.onError,
  ...rest
}) => {
  const { loadingStates, images: loadedImages = [] } = useLoadImages({
    ...rest,
    onError,
    requestInterceptor,
  })

  return {
    loadingStates,
    images: loadedImages,
  }
}
