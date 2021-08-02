import { LOADING_STATE } from '../useImageLoad/const'
import { LoadingState } from '../../types'
import { CornerstoneImage } from '../../utils/cornerstoneHelper'

export interface ImageLoadState {
  loadingState: LoadingState
  images: CornerstoneImage[]
  progress: number
}

interface ImageLoadAction {
  type: LoadingState
  payload?: {
    image: CornerstoneImage
    progress: number
  }
}

export function imageLoadReducer(
  state: ImageLoadState,
  action: ImageLoadAction
): ImageLoadState {
  const { type, payload } = action

  switch (type) {
    case LOADING_STATE.LOADING:
      return {
        ...state,
        loadingState: LOADING_STATE.LOADING,
      }
    case LOADING_STATE.SUCCESS:
      return {
        loadingState: LOADING_STATE.SUCCESS,
        images: payload?.image
          ? [...state.images, payload.image]
          : state.images,
        progress: payload?.progress ?? 0,
      }
    case LOADING_STATE.FAIL:
      return {
        ...state,
        loadingState: LOADING_STATE.FAIL,
      }
    default:
      return state
  }
}

export const INITIAL_IMAGE_LOAD_STATE = {
  loadingState: LOADING_STATE.INITIAL,
  images: [],
  progress: 0,
}
