import { useState, Dispatch, SetStateAction } from 'react'
import { LOADING_STATE } from './useImageLoad_/const'
import { LoadingState } from './useImageLoad_/types'
import useImageLoad_ from './useImageLoad_'
import { CornerstoneImage } from '../utils/cornerstoneHelper'
import { ViewerProp } from '../types'
import { DefaultProp } from '../Viewer/const'
import setWadoImageLoader from '../utils/cornerstoneHelper/setWadoImageLoader'

export default function useImageLoad({
  requestInterceptor = DefaultProp.requestInterceptor,
  onError = DefaultProp.onError,
  imageId,
}: ViewerProp): {
  loadingState: LoadingState
  image: CornerstoneImage | undefined
  setLoadingState: Dispatch<SetStateAction<LoadingState>>
} {
  const [loadingState, setLoadingState] = useState<LoadingState>(
    LOADING_STATE.INITIAL
  )

  const image = useImageLoad_({
    imageId,
    requestInterceptor,
    setLoader: () => setWadoImageLoader(onError),
    onError,
    setLoadingState,
  })

  return {
    loadingState,
    image,
    setLoadingState,
  }
}
