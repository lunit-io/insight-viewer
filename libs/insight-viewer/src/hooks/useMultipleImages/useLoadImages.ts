import { useEffect, useState, useRef } from 'react'
import { uid } from 'uid'
import { noop } from '../../utils/common'
import { LOADING_STATE } from '../../const'
import { useImageLoader } from '../useImageLoader'
import { loadImages } from './loadImages'
import { HTTP, LoadingState, ImageId } from '../../types'
import { Loaded, ImagesLoadState, OnImagesLoaded } from './types'
import { getLoadingStateMap, updateLoadedStates } from './loadingStates'
import { getImageIdsAndScheme } from './getImageIdsAndScheme'
import { Image } from '../../Viewer/types'

interface UseLoadImages {
  ({
    onError,
    requestInterceptor,
    ...rest
  }: HTTP & ImageId & { onImagesLoaded?: OnImagesLoaded; timeout: number }): ImagesLoadState
}

interface State {
  loadingStates: Map<number, LoadingState>
  _currentIndex: number
}

let _imageSeriesKey: string // Detect whether the image series are changed.

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
  timeout,
  ...rest
}) => {
  const { ids: imageIds, scheme: imageScheme } = getImageIdsAndScheme(rest)
  const [{ loadingStates }, setState] = useState<State>({
    loadingStates: getLoadingStateMap(Array.isArray(imageIds) ? imageIds.length : 0),
    _currentIndex: -1,
  })

  // The "_imageSeriesKey" is used for persisting viewport when the image frame is changed.
  // When the image series are updated, the "_imageSeriesKey" is updated. It makes the viewport to be reset.
  // As long as the _imageSeriesKey is the same, the viewport persists.
  const imagesRef = useRef<Image[]>([])
  const hasLoader = useImageLoader(rest, onError)

  useEffect(() => {
    // No images to load
    if (!imageIds || imageIds.length === 0 || !imageScheme) return
    if (!hasLoader) return // No image loader

    // Initialize first image loading state.
    imagesRef.current = []
    setState((prev: State) => ({
      ...prev,
      loadingStates: prev.loadingStates.set(0, LOADING_STATE.LOADING),
    }))

    // Update _imageSeriesKey When the image series are changed.
    _imageSeriesKey = uid()

    loadImages({ images: imageIds, imageScheme, requestInterceptor, timeout }).subscribe({
      next: ({ image, loaded }: Loaded) => {
        const newImage = { ...image, _imageSeriesKey }

        imagesRef.current.push(newImage)
        setState((prev: State) => ({
          loadingStates: updateLoadedStates({
            size: imageIds.length,
            stateMap: prev.loadingStates,
            value: loaded,
          }),
          _currentIndex: loaded - 1,
        }))
      },
      error: (err) => {
        onError(err)
        setState((prev) => ({
          ...prev,
          loadingStates: prev.loadingStates.set(prev._currentIndex + 1, LOADING_STATE.FAIL),
        }))
      },
      complete: () => {
        onImagesLoaded()
      },
    })
  }, [imageIds, imageScheme, onError, onImagesLoaded, requestInterceptor, hasLoader, timeout])

  return {
    images: imagesRef.current,
    loadingStates: Array.from(loadingStates.values()),
  }
}
