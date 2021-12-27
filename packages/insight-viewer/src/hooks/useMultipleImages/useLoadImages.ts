import { useEffect, useState, useRef } from 'react'
import { noop } from '../../utils/common'
import { LOADING_STATE } from '../../const'
import { useImageLoader } from '../useImageLoader'
import { loadImages } from './loadImages'
import { HTTP, LoadingState, ImageId } from '../../types'
import { Image } from '../../Viewer/types'
import { Loaded, ImagesLoadState, OnImagesLoaded } from './types'
import { getLoadingStateMap, updateLoadedStates } from './loadingStates'
import { getImageIdsAndScheme } from './getImageIdsAndScheme'

interface UseLoadImages {
  ({
    onError,
    requestInterceptor,
    ...rest
  }: HTTP & ImageId & { onImagesLoaded?: OnImagesLoaded }): ImagesLoadState
}

interface State {
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
  onImagesLoaded = noop,
  ...rest
}) => {
  const { ids: imageIds, scheme: imageScheme } = getImageIdsAndScheme(rest)
  const [{ loadingStates }, setState] = useState<State>({
    loadingStates: getLoadingStateMap(
      Array.isArray(imageIds) ? imageIds.length : 0
    ),
    _currentIndex: -1,
  })
  // The "_persistentViewport" flag is used for persisting viewport when the image frame is changed.
  // When all images are loaded, the "_persistentViewport" is changed to true. It makes the viewport is persistent.
  // Before all images are loaded, the "_persistentViewport" is false. The viewport is reset when the Multiframe image case is changed.
  const imagesRef = useRef<Image[]>([])
  const hasLoader = useImageLoader(rest, onError)

  useEffect(() => {
    if (!imageIds || imageIds.length === 0 || !imageScheme) return // No images to load
    if (!hasLoader) return // No image loader
    // Initialize first image loading state.
    imagesRef.current = []
    setState((prev: State) => ({
      ...prev,
      loadingStates: prev.loadingStates.set(0, LOADING_STATE.LOADING),
    }))

    loadImages({ images: imageIds, imageScheme, requestInterceptor }).subscribe(
      {
        next: ({ image, loaded }: Loaded) => {
          imagesRef.current = [
            ...imagesRef.current,
            { ...image, _persistentViewport: false },
          ]
          setState((prev: State) => ({
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
        complete: () => {
          setTimeout(() => {
            imagesRef.current = [...imagesRef.current].map(
              image =>
                <Image>{
                  ...image,
                  _persistentViewport: true,
                }
            )
          }, 0)
          onImagesLoaded()
        },
      }
    )
  }, [
    imageIds,
    imageScheme,
    onError,
    onImagesLoaded,
    requestInterceptor,
    hasLoader,
  ])

  return {
    images: imagesRef.current,
    loadingStates: Array.from(loadingStates.values()),
  }
}
