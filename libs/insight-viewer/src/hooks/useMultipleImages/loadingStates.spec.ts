import { getLoadingStateMap, updateLoadedStates } from './loadingStates'
import { LoadingState } from '../../types'
import { LOADING_STATE } from '../../const'

describe('getLoadingStateMap()', () => {
  it('with image size 1', () => {
    const stateMap = getLoadingStateMap(1)
    expect(stateMap.size).toBe(1)
    expect(stateMap.get(0)).toBe(LOADING_STATE.INITIAL)
    expect(stateMap.get(1)).toBeUndefined()
  })

  it('with image size 3', () => {
    const stateMap = getLoadingStateMap(3)
    expect(stateMap.size).toBe(3)
    expect(stateMap.get(0)).toBe(LOADING_STATE.INITIAL)
    expect(stateMap.get(1)).toBe(LOADING_STATE.INITIAL)
    expect(stateMap.get(2)).toBe(LOADING_STATE.INITIAL)
    expect(stateMap.get(3)).toBeUndefined()
  })
})

describe('updateLoadingStates()', () => {
  it('with image size 1', () => {
    const stateMap = updateLoadedStates({
      size: 1,
      stateMap: getLoadingStateMap(1),
      value: 1,
    })
    expect(stateMap.size).toBe(1)
    expect(stateMap.get(0)).toBe(LOADING_STATE.SUCCESS)
    expect(stateMap.get(1)).toBeUndefined()
  })

  describe('with image size 3', () => {
    let firstLoaded: Map<number, LoadingState>
    let secondLoaded: Map<number, LoadingState>

    it('loads the first image', () => {
      const stateMap = updateLoadedStates({
        size: 3,
        stateMap: getLoadingStateMap(3),
        value: 1,
      })
      firstLoaded = stateMap
      expect(stateMap.size).toBe(3)
      expect(stateMap.get(0)).toBe(LOADING_STATE.SUCCESS)
      expect(stateMap.get(1)).toBe(LOADING_STATE.LOADING)
      expect(stateMap.get(2)).toBe(LOADING_STATE.INITIAL)
      expect(stateMap.get(3)).toBeUndefined()
    })

    it('loads the second image', () => {
      const stateMap = updateLoadedStates({
        size: 3,
        stateMap: firstLoaded,
        value: 2,
      })
      secondLoaded = stateMap
      expect(stateMap.size).toBe(3)
      expect(stateMap.get(0)).toBe(LOADING_STATE.SUCCESS)
      expect(stateMap.get(1)).toBe(LOADING_STATE.SUCCESS)
      expect(stateMap.get(2)).toBe(LOADING_STATE.LOADING)
      expect(stateMap.get(3)).toBeUndefined()
    })

    it('loads the last image', () => {
      const stateMap = updateLoadedStates({
        size: 3,
        stateMap: secondLoaded,
        value: 3,
      })
      expect(stateMap.size).toBe(3)
      expect(stateMap.get(0)).toBe(LOADING_STATE.SUCCESS)
      expect(stateMap.get(1)).toBe(LOADING_STATE.SUCCESS)
      expect(stateMap.get(2)).toBe(LOADING_STATE.SUCCESS)
      expect(stateMap.get(3)).toBeUndefined()
    })
  })
})
