import { useState, Dispatch, SetStateAction } from 'react'
import { LOADING_STATE } from './useImageLoad_/const'
import { LoadingState, ImageLoadState } from './useImageLoad_/types'
import useImageLoad_ from './useImageLoad_'
import { CornerstoneImage } from '../utils/cornerstoneHelper'
import { ViewerProp } from '../types'
import { DefaultProp } from '../Viewer/const'
import setWadoImageLoader from '../utils/cornerstoneHelper/setWadoImageLoader'

type Prop = ViewerProp & {
  imageId: string
}

export default function useImageLoad({
  requestInterceptor = DefaultProp.requestInterceptor,
  onError = DefaultProp.onError,
  imageId,
}: Prop): {
  loadingState: LoadingState
  image: CornerstoneImage | undefined
  onLoadingStateChanged: Dispatch<SetStateAction<ImageLoadState>>
} {
  const [{ loadingState }, onLoadingStateChanged] = useState<ImageLoadState>({
    loadingState: LOADING_STATE.INITIAL,
  })

  const image = useImageLoad_({
    imageId,
    requestInterceptor,
    setLoader: () => setWadoImageLoader(onError),
    onError,
    onLoadingStateChanged,
  })

  return {
    loadingState,
    image,
    onLoadingStateChanged,
  }
}
