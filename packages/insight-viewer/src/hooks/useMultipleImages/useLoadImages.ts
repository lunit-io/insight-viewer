import { useEffect, useState } from 'react'
import { CornerstoneImage } from '../../utils/cornerstoneHelper'
import { LOADING_STATE } from '../../const'
import { useImageLoader } from '../useImageLoader'
import { loadImages } from './loadImages'
import { HTTP, LoadingState, ImageId } from '../../types'
import { Loaded, ImagesLoadState } from './types'
import { getLoadingStateMap, updateLoadedStates } from './loadingStates'
import { getImageIdsAndType } from './getImageIdsAndType'

interface UseLoadImages {
  ({ onError, requestInterceptor, ...rest }: HTTP & ImageId): ImagesLoadState
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
  onError,
  requestInterceptor,
  ...rest
}) => {
  const { ids: imageIds, scheme: imageScheme } = getImageIdsAndType(rest)
  const [{ images, loadingStates }, setState] = useState<State>({
    images: [],
    loadingStates: getLoadingStateMap(
      Array.isArray(imageIds) ? imageIds.length : 0
    ),
    _currentIndex: -1,
  })

  const hasLoader = useImageLoader(rest, onError)

  useEffect(() => {
    if (!imageIds || imageIds.length === 0 || !imageScheme) return // No images to load
    if (!hasLoader) return // No image loader

    // Initialize first image loading state.
    setState((prev: State) => ({
      ...prev,
      loadingStates: prev.loadingStates.set(0, LOADING_STATE.LOADING),
    }))

    loadImages({ images: imageIds, imageScheme, requestInterceptor }).subscribe(
      {
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
      }
    )
  }, [imageIds, imageScheme, onError, requestInterceptor, hasLoader])

  return {
    images,
    loadingStates: Array.from(loadingStates.values()),
  }
}
