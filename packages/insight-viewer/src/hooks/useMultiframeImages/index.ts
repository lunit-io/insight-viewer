/**
 * @fileoverview Loads images(Dicom/Web) and
 * return the current image and loading state, current frame and frame updater.
 */
import { SetStateAction } from 'react'
import usePrefetch from './usePrefetch'
import useFrame, { SetFrame } from './useFrame'
import { HTTP, LoaderType } from '../../types'
import { LOADER_TYPE, CONFIG } from '../../const'
import { ImageLoadState } from '../../stores/imageLoadReducer'
import { CornerstoneImage } from '../../utils/cornerstoneHelper'

type Prop = {
  imageIds: string[]
  initialFrame?: number
  type?: LoaderType
} & Partial<HTTP>

interface UseMultiframeImages {
  ({ imageIds, initialFrame, onError, requestInterceptor, type }: Prop): {
    frame: number // current frame index
    setFrame: SetFrame // set current frame index
  } & Omit<ImageLoadState, 'images' | 'progress'> & {
      image: CornerstoneImage
    }
}

/**
 * @param imageIds The images urls to prefetch.
 * @param type The image type to load. 'Dicom'(default) | 'Web'.
 * @param requestInterceptor The callback is called before a request is sent.
 *  It use ky.js beforeRequest hook.
 * @param initialFrame
 * @param onError The error handler.
 * @returns <{ image, loadingState, frame, setFrame }> image is a CornerstoneImage.
 *  loadingState is 'initial'|'loading'|'success'|'fail'
 */
export const useMultiframeImages: UseMultiframeImages = ({
  imageIds,
  type = LOADER_TYPE.Dicom,
  initialFrame = 0,
  requestInterceptor = CONFIG.requestInterceptor,
  onError = CONFIG.onError,
}) => {
  const { loadingState, images: loadedImages } = usePrefetch({
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
    loadingState,
    image: loadedImages[frame],
  }
}
