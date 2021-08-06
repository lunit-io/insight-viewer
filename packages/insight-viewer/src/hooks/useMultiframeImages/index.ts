/**
 * @fileoverview Loads images(Dicom/Web) and
 * return the current image and loading state, current frame and frame updater.
 */

import { useLoadImages } from './useLoadImages'

import { HTTP, LoaderType } from '../../types'
import { LOADER_TYPE, CONFIG } from '../../const'
import { ImagesLoadState } from './types'

type Prop = {
  imageIds: string[]
  initialFrame?: number
  type?: LoaderType
} & Partial<HTTP>

interface UseMultiframeImages {
  ({
    imageIds,
    initialFrame,
    onError,
    requestInterceptor,
    type,
  }: Prop): ImagesLoadState
}

/**
 * @param imageIds The images urls to load.
 * @param type The image type to load. 'Dicom'(default) | 'Web'.
 * @param initialFrame
 * @param requestInterceptor The callback is called before a request is sent.
 *  It uses ky.js beforeRequest hook.
 * @param onError The error handler.
 * @returns <{ image, loadingStates, frame, setFrame }> image is a CornerstoneImage.
 *  loadingStates are each image's <'initial'|'loading'|'success'|'fail'>
 */
export const useMultiframeImages: UseMultiframeImages = ({
  imageIds,
  type = LOADER_TYPE.Dicom,
  requestInterceptor = CONFIG.requestInterceptor,
  onError = CONFIG.onError,
}) => {
  const { loadingStates, images: loadedImages = [] } = useLoadImages({
    images: imageIds,
    onError,
    requestInterceptor,
    type,
  })

  return {
    loadingStates,
    images: loadedImages,
  }
}
