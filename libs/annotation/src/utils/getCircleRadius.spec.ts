import { getCircleRadiusByMeasuringUnit, getCircleRadius, getCircleRadiusByCenter } from './getCircleRadius'

import type { Image } from '@lunit/insight-viewer'
import type { Point } from '../types'

describe('getCircleRadius:', () => {
  it('should calculate circle radius', () => {
    const MOCK_MOUSE_DOWN_POINT_1: Point = [0, 0]
    const MOCK_MOUSE_DOWN_POINT_2: Point = [1, 1]
    const MOCK_MOUSE_DOWN_POINT_3: Point = [2, 2]

    const MOCK_MOUSE_UP_POINT_1: Point = [5, 5]
    const MOCK_MOUSE_UP_POINT_2: Point = [10, 10]
    const MOCK_MOUSE_UP_POINT_3: Point = [20, 20]

    expect(getCircleRadius(MOCK_MOUSE_DOWN_POINT_1, MOCK_MOUSE_UP_POINT_1)).toEqual(3.5355339059327378)
    expect(getCircleRadius(MOCK_MOUSE_DOWN_POINT_2, MOCK_MOUSE_UP_POINT_2)).toEqual(6.363961030678928)
    expect(getCircleRadius(MOCK_MOUSE_DOWN_POINT_3, MOCK_MOUSE_UP_POINT_3)).toEqual(12.727922061357855)
  })
})

describe('getCircleRadiusByCenter:', () => {
  it('should calculate circle radius', () => {
    const MOCK_MOUSE_DOWN_POINT_1: Point = [0, 0]
    const MOCK_MOUSE_DOWN_POINT_2: Point = [1, 1]
    const MOCK_MOUSE_DOWN_POINT_3: Point = [2, 2]

    const MOCK_MOUSE_UP_POINT_1: Point = [5, 5]
    const MOCK_MOUSE_UP_POINT_2: Point = [10, 10]
    const MOCK_MOUSE_UP_POINT_3: Point = [20, 20]

    expect(getCircleRadiusByCenter(MOCK_MOUSE_DOWN_POINT_1, MOCK_MOUSE_UP_POINT_1)).toEqual(7.0710678118654755)
    expect(getCircleRadiusByCenter(MOCK_MOUSE_DOWN_POINT_2, MOCK_MOUSE_UP_POINT_2)).toEqual(12.727922061357855)
    expect(getCircleRadiusByCenter(MOCK_MOUSE_DOWN_POINT_3, MOCK_MOUSE_UP_POINT_3)).toEqual(25.45584412271571)
  })
})

describe('getCircleRadiusByMeasuringUnit:', () => {
  it('should calculate circle radius without current Image', () => {
    const MOCK_MOUSE_DOWN_POINT_1: Point = [0, 0]
    const MOCK_MOUSE_DOWN_POINT_2: Point = [1, 1]
    const MOCK_MOUSE_DOWN_POINT_3: Point = [2, 2]

    const MOCK_MOUSE_UP_POINT_1: Point = [5, 5]
    const MOCK_MOUSE_UP_POINT_2: Point = [10, 10]
    const MOCK_MOUSE_UP_POINT_3: Point = [20, 20]

    expect(getCircleRadiusByMeasuringUnit(MOCK_MOUSE_DOWN_POINT_1, MOCK_MOUSE_UP_POINT_1, null)).toEqual({
      radius: 3.5355339059327378,
      unit: 'px',
    })
    expect(getCircleRadiusByMeasuringUnit(MOCK_MOUSE_DOWN_POINT_2, MOCK_MOUSE_UP_POINT_2, null)).toEqual({
      radius: 6.363961030678928,
      unit: 'px',
    })
    expect(getCircleRadiusByMeasuringUnit(MOCK_MOUSE_DOWN_POINT_3, MOCK_MOUSE_UP_POINT_3, null)).toEqual({
      radius: 12.727922061357855,
      unit: 'px',
    })
  })
  it('should calculate circle radius with PixelSpacing', () => {
    const MOCK_IMAGE_1 = { columnPixelSpacing: 0.7, rowPixelSpacing: 0.7 } as Image
    const MOCK_IMAGE_2 = { columnPixelSpacing: 0.8, rowPixelSpacing: 0.8 } as Image
    const MOCK_IMAGE_3 = { columnPixelSpacing: 0.9, rowPixelSpacing: 0.9 } as Image
    const MOCK_MOUSE_DOWN_POINT_1: Point = [0, 0]
    const MOCK_MOUSE_DOWN_POINT_2: Point = [1, 1]
    const MOCK_MOUSE_DOWN_POINT_3: Point = [2, 2]
    const MOCK_MOUSE_UP_POINT_1: Point = [5, 5]
    const MOCK_MOUSE_UP_POINT_2: Point = [10, 10]
    const MOCK_MOUSE_UP_POINT_3: Point = [20, 20]

    expect(getCircleRadiusByMeasuringUnit(MOCK_MOUSE_DOWN_POINT_1, MOCK_MOUSE_UP_POINT_1, MOCK_IMAGE_1)).toEqual({
      radius: 2.4748737341529163,
      unit: 'mm',
    })
    expect(getCircleRadiusByMeasuringUnit(MOCK_MOUSE_DOWN_POINT_2, MOCK_MOUSE_UP_POINT_2, MOCK_IMAGE_2)).toEqual({
      radius: 5.091168824543142,
      unit: 'mm',
    })
    expect(getCircleRadiusByMeasuringUnit(MOCK_MOUSE_DOWN_POINT_3, MOCK_MOUSE_UP_POINT_3, MOCK_IMAGE_3)).toEqual({
      radius: 11.45512985522207,
      unit: 'mm',
    })
  })
  it('calculate circle radius with ImagerPixelSpacing', () => {
    const MOCK_IMAGE_1 = { data: { string: () => '0.7\\0.7' } } as unknown as Image
    const MOCK_IMAGE_2 = { data: { string: () => '0.8\\0.8' } } as unknown as Image
    const MOCK_IMAGE_3 = { data: { string: () => '0.9\\0.9' } } as unknown as Image
    const MOCK_MOUSE_DOWN_POINT_1: Point = [0, 0]
    const MOCK_MOUSE_DOWN_POINT_2: Point = [1, 1]
    const MOCK_MOUSE_DOWN_POINT_3: Point = [2, 2]
    const MOCK_MOUSE_UP_POINT_1: Point = [5, 5]
    const MOCK_MOUSE_UP_POINT_2: Point = [10, 10]
    const MOCK_MOUSE_UP_POINT_3: Point = [20, 20]

    expect(getCircleRadiusByMeasuringUnit(MOCK_MOUSE_DOWN_POINT_1, MOCK_MOUSE_UP_POINT_1, MOCK_IMAGE_1)).toEqual({
      radius: 2.4748737341529163,
      unit: 'mm',
    })
    expect(getCircleRadiusByMeasuringUnit(MOCK_MOUSE_DOWN_POINT_2, MOCK_MOUSE_UP_POINT_2, MOCK_IMAGE_2)).toEqual({
      radius: 5.091168824543142,
      unit: 'mm',
    })
    expect(getCircleRadiusByMeasuringUnit(MOCK_MOUSE_DOWN_POINT_3, MOCK_MOUSE_UP_POINT_3, MOCK_IMAGE_3)).toEqual({
      radius: 11.45512985522207,
      unit: 'mm',
    })
  })
  it('calculate circle radius with no PixelSpacing or ImagerPixelSpacing', () => {
    const MOCK_IMAGE = {
      data: {
        string: () => undefined,
      },
    } as unknown as Image
    const MOCK_MOUSE_DOWN_POINT_1: Point = [0, 0]
    const MOCK_MOUSE_DOWN_POINT_2: Point = [1, 1]
    const MOCK_MOUSE_DOWN_POINT_3: Point = [2, 2]
    const MOCK_MOUSE_UP_POINT_1: Point = [5, 5]
    const MOCK_MOUSE_UP_POINT_2: Point = [10, 10]
    const MOCK_MOUSE_UP_POINT_3: Point = [20, 20]

    expect(getCircleRadiusByMeasuringUnit(MOCK_MOUSE_DOWN_POINT_1, MOCK_MOUSE_UP_POINT_1, MOCK_IMAGE)).toEqual({
      radius: 3.5355339059327378,
      unit: 'px',
    })
    expect(getCircleRadiusByMeasuringUnit(MOCK_MOUSE_DOWN_POINT_2, MOCK_MOUSE_UP_POINT_2, MOCK_IMAGE)).toEqual({
      radius: 6.363961030678928,
      unit: 'px',
    })
    expect(getCircleRadiusByMeasuringUnit(MOCK_MOUSE_DOWN_POINT_3, MOCK_MOUSE_UP_POINT_3, MOCK_IMAGE)).toEqual({
      radius: 12.727922061357855,
      unit: 'px',
    })
  })
})
