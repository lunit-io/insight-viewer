import { LOADING_STATE } from '../../const'
import { LoadingState } from '../../types'

export function getLoadingStateMap(length: number): Map<number, LoadingState> {
  const arr = Array(length).fill(LOADING_STATE.INITIAL)
  return new Map(arr.map((value: LoadingState, idx) => [idx, value]))
}

/**
 * @param size The length of images to load. It is greater than 0.
 * @param stateMap The map of each image loading state({ 0: 'success', 1: 'loading', ... }).
 *  The size of it equals to size.
 * @param value The count of loaded images. It is greater than 1.
 * @returns The map of each image loading state.
 */
export function updateLoadedStates({
  size,
  stateMap,
  value,
}: {
  size: number
  stateMap: Map<number, LoadingState>
  value: number
}): Map<number, LoadingState> {
  return value === size // If it is the last image, do not set next image's loading state.
    ? stateMap.set(value - 1, LOADING_STATE.SUCCESS)
    : stateMap.set(value - 1, LOADING_STATE.SUCCESS).set(value, LOADING_STATE.LOADING)
}
