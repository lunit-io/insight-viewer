import { useEffect, useReducer, useRef } from 'react'
/**
 * @fileoverview Loads an image(Dicom/Web) and return the loaded image and loading state of it.
 */
import { LOADING_STATE, CONFIG } from '../../const'
import { ImageId, HTTP, LoadingState } from '../../types'
import { WadoImageLoaderOptions } from '../../utils/cornerstoneHelper'
import { noop } from '../../utils/common'
import { useImageLoader } from '../useImageLoader'
import { imageLoadReducer, INITIAL_IMAGE_LOAD_STATE } from './imageLoadReducer'
import { loadImage } from './loadImage'
import { getImageIdAndScheme } from './getImageIdAndScheme'
import { Image } from '../../Viewer/types'

interface OnImageLoaded {
  (): void
}
interface UseImage {
  (
    props: Partial<HTTP> &
      ImageId & {
        onImageLoaded?: OnImageLoaded
        loaderOptions?: WadoImageLoaderOptions
        timeout?: number
      }
  ): {
    loadingState: LoadingState
    image: Image
  }
}

/**
 * @param rest wadouri | dicomfile | web
 * @param requestInterceptor The callback is called before a request is sent.
 *  It use ky.js beforeRequest hook.
 * @param onError The error handler.
 * @returns <{ image, loadingState }> image is a CornerstoneImage.
 *  loadingState is 'initial'|'loading'|'success'|'fail'
 */
export const useImage: UseImage = ({
  requestInterceptor = CONFIG.requestInterceptor,
  onError = CONFIG.onError,
  timeout = CONFIG.timeout,
  onImageLoaded = noop,
  loaderOptions,
  ...rest
}) => {
  const { id: imageId, scheme: imageScheme } = getImageIdAndScheme(rest)
  const onImageLoadedRef = useRef<OnImageLoaded>()

  const [imageLoad, dispatch] = useReducer(imageLoadReducer, INITIAL_IMAGE_LOAD_STATE)
  const hasLoader = useImageLoader(rest, onError, loaderOptions)

  useEffect(() => {
    if (onImageLoadedRef?.current) return
    onImageLoadedRef.current = onImageLoaded
  }, [onImageLoaded])

  useEffect(() => {
    if (!hasLoader || !imageId || !imageScheme) return
    dispatch({ type: LOADING_STATE.LOADING })

    loadImage({
      imageId,
      imageScheme,
      requestInterceptor,
      onError,
      timeout,
    })
      .then(res => {
        dispatch({
          type: LOADING_STATE.SUCCESS,
          payload: res,
        })

        setTimeout(() => {
          onImageLoadedRef.current?.()
        }, 0)
      })
      .catch(() => dispatch({ type: LOADING_STATE.FAIL }))
  }, [hasLoader, imageId, imageScheme, requestInterceptor, onError, timeout])

  return imageLoad
}
