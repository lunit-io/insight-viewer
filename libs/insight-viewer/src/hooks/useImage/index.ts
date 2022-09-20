import { useEffect, useMemo, useReducer, useRef } from 'react'
/**
 * @fileoverview Loads an image(Dicom/Web) and return the loaded image and loading state of it.
 */
import { LOADING_STATE, CONFIG, IMAGE_LOADER_SCHEME } from '../../const'
import { ImageId, LoadingState, OnError, RequestInterceptor } from '../../types'
import { WadoImageLoaderOptions } from '../../utils/cornerstoneHelper'
import { noop } from '../../utils/common'
import { useImageLoader } from '../useImageLoader'
import { imageLoadReducer, INITIAL_IMAGE_LOAD_STATE } from './imageLoadReducer'
import { loadImage } from './loadImage'
import { getImageIdAndScheme } from './getImageIdAndScheme'
import { Image } from '../../Viewer/types'
import { getHttpClient } from '../../utils/httpClient'

interface OnImageLoaded {
  (): void
}

interface UseImagePropsV1 {
  timeout?: number
  onError?: OnError
  requestInterceptor?: RequestInterceptor
  loader?: never
}

interface UseImagePropsV2 {
  timeout?: never
  onError?: never
  requestInterceptor?: never
  loader?: (url: string) => Promise<ArrayBuffer>
}

type Props = UseImagePropsV1 | UseImagePropsV2
interface UseImage {
  (
    props: ImageId & {
      onImageLoaded?: OnImageLoaded
      loaderOptions?: WadoImageLoaderOptions
    } & Props
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
 * @param loader The loader can setup custom http client.
 * @returns <{ image, loadingState }> image is a CornerstoneImage.
 *  loadingState is 'initial'|'loading'|'success'|'fail'
 */
export const useImage: UseImage = ({
  onImageLoaded = noop,
  loaderOptions,
  loader = undefined,
  requestInterceptor = CONFIG.requestInterceptor,
  onError = CONFIG.onError,
  timeout = CONFIG.timeout,
  ...imageIds
}) => {
  const onImageLoadedRef = useRef<OnImageLoaded>()
  const [imageLoad, dispatch] = useReducer(imageLoadReducer, INITIAL_IMAGE_LOAD_STATE)
  const hasLoader = useImageLoader(imageIds, onError, loaderOptions)

  const { imageId, scheme } = getImageIdAndScheme(imageIds)

  const imageLoader = useMemo(() => {
    const isLoaderNeeded = scheme === IMAGE_LOADER_SCHEME.DICOMFILE
    return isLoaderNeeded ? undefined : loader || getHttpClient({ requestInterceptor, timeout })
  }, [loader, requestInterceptor, scheme, timeout])

  //  onImageLoaded 의 경우 별도의 ref에 담지 않고 실행하여도 문제없을 것 같습니다
  useEffect(() => {
    if (onImageLoadedRef?.current) return
    onImageLoadedRef.current = onImageLoaded
  }, [onImageLoaded])

  useEffect(() => {
    if (!hasLoader || !imageId) return
    dispatch({ type: LOADING_STATE.LOADING })

    loadImage({
      imageId,
      loader: imageLoader,
      onError,
    })
      .then((res) => {
        dispatch({
          type: LOADING_STATE.SUCCESS,
          payload: res,
        })

        setTimeout(() => {
          onImageLoadedRef.current?.()
        }, 0)
      })
      .catch((e) => {
        dispatch({ type: LOADING_STATE.FAIL })
      })
  }, [hasLoader, imageId, imageLoader, onError])

  return imageLoad
}
