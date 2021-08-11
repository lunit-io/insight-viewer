import { useEffect, useState } from 'react'
import { CornerstoneImage } from '../../utils/cornerstoneHelper'
import { LOADING_STATE } from '../../const'
import { useImageLoader } from '../useImageLoader'
import { loadImages } from './loadImages'
import { HTTP, LoaderType, LoadingState } from '../../types'
import { Loaded, ImagesLoadState } from './types'
import { getLoadingStateMap, updateLoadedStates } from './loadingStates'

interface UseLoadImages {
  ({
    images,
    onError,
    requestInterceptor,
    type,
  }: HTTP & {
    images: string[]
    type?: LoaderType
  }): ImagesLoadState
}

interface State {
  images: CornerstoneImage[]
  loadingStates: Map<number, LoadingState>
  _currentIndex: number
}

/**
 * @param imageIds The images urls to load.
 * @param type The image type to load. 'Dicom'(default) | 'Web'.
 * @param requestInterceptor The callback is called before a request is sent.
 *  It use ky.js beforeRequest hook.
 * @param initialFrame
 * @param onError The error handler.
 * @returns <{ images, loadingStates }> images are CornerstoneImages.
 *  loadingStates are <'initial'|'loading'|'success'|'fail'>[]
 */
export const useLoadImages: UseLoadImages = ({
  images: imageIds,
  onError,
  requestInterceptor,
  type,
}) => {
  const [{ images, loadingStates }, setState] = useState<State>({
    images: [],
    loadingStates: getLoadingStateMap(imageIds.length),
    _currentIndex: -1,
  })

  const hasLoader = useImageLoader(type, onError)

  useEffect(() => {
    if (imageIds.length === 0) return // No images to load
    if (!hasLoader) return // No image loader

    // Initialize first image loading state.
    setState((prev: State) => ({
      ...prev,
      loadingStates: prev.loadingStates.set(0, LOADING_STATE.LOADING),
    }))

    loadImages({ images: imageIds, requestInterceptor }).subscribe({
      next: ({ image, loaded }: Loaded) => {
        setState((prev: State) => ({
          images: [...prev.images, image],
          loadingStates: updateLoadedStates({
            size: imageIds.length,
            stateMap: prev.loadingStates,
            value: loaded,
          }),
          _currentIndex: loaded - 1,
        }))
      },
      error: err => {
        onError(err)
        setState(prev => ({
          ...prev,
          loadingStates: prev.loadingStates.set(
            prev._currentIndex + 1,
            LOADING_STATE.FAIL
          ),
        }))
      },
    })
  }, [imageIds, onError, requestInterceptor, hasLoader])

  return {
    images,
    loadingStates: Array.from(loadingStates.values()),
  }
}
