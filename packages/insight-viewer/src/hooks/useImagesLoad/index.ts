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

export function useImagesLoad({
  imageIds,
  initialFrame = 0,
  onError = CONFIG.onError,
  requestInterceptor = CONFIG.requestInterceptor,
  type = LOADER_TYPE.Dicom,
}: Prop): {
  frame: number // current frame index
  setFrame: SetFrame // set current frame index
} & Omit<ImageLoadState, 'images'> & {
    image: CornerstoneImage
  } {
  const {
    loadingState,
    images: loadedImages,
    progress,
  } = usePrefetch({
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
    progress,
  }
}
