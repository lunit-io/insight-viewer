import usePrefetch from './usePrefetch'
import useFrame, { SetFrame } from './useFrame'
import { HTTP } from '../../types'
import { DefaultProp } from '../../Viewer/const'

type Prop = {
  initialFrame?: number
  prefetch?: boolean
} & Partial<HTTP>

export default function useMultiframe(
  IMAGES: string[],
  { initialFrame, prefetch, onError, requestInterceptor }: Prop | undefined = {}
): {
  image: string // current image
  frame: number // current frame index
  setFrame: SetFrame // set current frame index
} {
  usePrefetch({
    images: IMAGES,
    onError: onError ?? DefaultProp.onError,
    requestInterceptor: requestInterceptor ?? DefaultProp.requestInterceptor,
    prefetch: prefetch ?? true,
  })
  const { frame, setFrame } = useFrame(initialFrame ?? 0)

  return {
    image: IMAGES[frame],
    frame,
    setFrame,
  }
}
