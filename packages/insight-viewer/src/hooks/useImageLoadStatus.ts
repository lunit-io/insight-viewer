import { useState, Dispatch, SetStateAction } from 'react'
import { LOADING_STATUS } from './useImageLoad/const'
import { LoadingStatus } from './useImageLoad/types'
import { CornerstoneImage } from '../utils/cornerstoneHelper'

export interface ImageLoadStatus {
  loadingStatus: LoadingStatus
  loaded: CornerstoneImage | null
}

export default function useImageLoadStatus(): {
  loadingStatus: LoadingStatus
  loaded: CornerstoneImage | null
  setLoadingStatus: Dispatch<SetStateAction<ImageLoadStatus>>
} {
  const [{ loadingStatus, loaded }, setLoadingStatus] =
    useState<ImageLoadStatus>({
      loadingStatus: LOADING_STATUS.INITIAL,
      loaded: null,
    })

  return {
    loadingStatus,
    loaded,
    setLoadingStatus,
  }
}
