/**
 * @fileoverview Loads images(Dicom/Web) and
 * return the current image and loading state, current frame and frame updater.
 */
import { SetStateAction } from 'react'
import { useLoadImages } from './useLoadImages'
import useFrame, { SetFrame } from './useFrame'
import { HTTP, LoaderType } from '../../types'
import { LOADER_TYPE, CONFIG } from '../../const'
import { ImagesLoadState } from './types'

type Prop = {
  imageIds: string[]
  initialFrame?: number
  type?: LoaderType
} & Partial<HTTP>

interface UseMultiframeImages {
  ({ imageIds, initialFrame, onError, requestInterceptor, type }: Prop): {
    frame: number // current frame index
    setFrame: SetFrame // set current frame index
  } & ImagesLoadState
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
  initialFrame = 0,
  requestInterceptor = CONFIG.requestInterceptor,
  onError = CONFIG.onError,
}) => {
  const { loadingStates, images: loadedImages = [] } = useLoadImages({
    images: imageIds,
    onError,
    requestInterceptor,
    type,
  })

  const { frame, setFrame } = useFrame(initialFrame ?? 0)

  function handleFrame(arg: SetStateAction<number>) {
    let frameIndex = 0

    if (typeof arg === 'number') {
      frameIndex = arg
    } else {
      frameIndex = arg(frame)
    }

    if (frameIndex < 0 || frameIndex > imageIds.length - 1) return
    setFrame(arg)
  }

  return {
    frame,
    setFrame: handleFrame,
    loadingStates,
    images: loadedImages,
  }
}
