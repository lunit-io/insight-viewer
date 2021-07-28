import { LOADING_STATE } from './const'

export type LoadingState = typeof LOADING_STATE[keyof typeof LOADING_STATE]

export interface ImageLoadState {
  loadingState: LoadingState
}
