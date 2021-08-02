import { SetStateAction } from 'react'
import usePrefetch from './usePrefetch'
import useFrame, { SetFrame } from './useFrame'
import { HTTP } from '../../types'
import { CONFIG } from '../../const'
import { ImageLoadState } from './reducers'
import { CornerstoneImage } from '../../utils/cornerstoneHelper'

type Prop = {
  initialFrame?: number
  prefetch?: boolean
} & Partial<HTTP>

export function useMultiframe(
  IMAGES: string[],
  { initialFrame, prefetch, onError, requestInterceptor }: Prop | undefined = {}
): {
  frame: number // current frame index
  setFrame: SetFrame // set current frame index
} & Omit<ImageLoadState, 'images'> & {
    image: CornerstoneImage
  } {
  const { loadingState, images, progress } = usePrefetch({
    images: IMAGES,
    onError: onError ?? CONFIG.onError,
    requestInterceptor: requestInterceptor ?? CONFIG.requestInterceptor,
    prefetch: prefetch ?? true,
  })

  const { frame, setFrame } = useFrame(initialFrame ?? 0)

  function handleFrame(arg: SetStateAction<number>) {
    let frameIndex = 0

    if (typeof arg === 'number') {
      frameIndex = arg
    } else {
      frameIndex = arg(frame)
    }

    if (frameIndex < 0 || frameIndex > IMAGES.length - 1) return
    setFrame(arg)
  }

  return {
    frame,
    setFrame: handleFrame,
    loadingState,
    image: images[frame],
    progress,
  }
}
