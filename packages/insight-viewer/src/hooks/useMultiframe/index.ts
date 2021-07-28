import { SetStateAction } from 'react'
import usePrefetch from './usePrefetch'
import useFrame, { SetFrame } from './useFrame'
import { HTTP } from '../../types'
import { CONFIG } from '../../const'

type Prop = {
  initialFrame?: number
  prefetch?: boolean
} & Partial<HTTP>

export function useMultiframe(
  IMAGES: string[],
  { initialFrame, prefetch, onError, requestInterceptor }: Prop | undefined = {}
): {
  image: string // current image
  frame: number // current frame index
  setFrame: SetFrame // set current frame index
} {
  usePrefetch({
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
    image: IMAGES[frame],
    frame,
    setFrame: handleFrame,
  }
}
