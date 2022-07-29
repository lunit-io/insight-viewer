import { LOADING_STATE } from '../../const'
import { LoadingState } from '../../types'
import { Image } from '../../Viewer/types'

export type ImageLoadState = {
  loadingState: LoadingState
  image: Image
}

type ImageLoadAction = {
  type: LoadingState
  payload?: Image
}

export function imageLoadReducer(state: ImageLoadState, action: ImageLoadAction): ImageLoadState {
  const { type } = action

  switch (type) {
    case LOADING_STATE.LOADING:
      return {
        ...state,
        loadingState: LOADING_STATE.LOADING,
      }
    case LOADING_STATE.SUCCESS:
      return {
        loadingState: LOADING_STATE.SUCCESS,
        image: action.payload,
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
  image: undefined,
}
