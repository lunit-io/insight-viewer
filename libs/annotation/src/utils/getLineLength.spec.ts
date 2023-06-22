import { getLineLength } from './getLineLength'
import type { Image } from '@lunit/insight-viewer'
import type { Point } from '../types'

describe('getLineLength: ', () => {
  it('should return the length of a line without Image', () => {
    const MOCK_START_POINT_1: Point = [0, 0]
    const MOCK_START_POINT_2: Point = [1, 1]
    const MOCK_START_POINT_3: Point = [2, 2]

    const MOCK_END_POINT_1: Point = [5, 5]
    const MOCK_END_POINT_2: Point = [10, 10]
    const MOCK_END_POINT_3: Point = [20, 20]

    expect(getLineLength(MOCK_START_POINT_1, MOCK_END_POINT_1, null)).toEqual({
      length: 7.0710678118654755,
      unit: 'px',
    })
    expect(getLineLength(MOCK_START_POINT_2, MOCK_END_POINT_2, null)).toEqual({
      length: 12.727922061357855,
      unit: 'px',
    })
    expect(getLineLength(MOCK_START_POINT_3, MOCK_END_POINT_3, null)).toEqual({
      length: 25.45584412271571,
      unit: 'px',
    })
  })

  it('should return the length of a line with PixelSpacing', () => {
    const MOCK_IMAGE_1 = { columnPixelSpacing: 0.7, rowPixelSpacing: 0.7 } as Image
    const MOCK_IMAGE_2 = { columnPixelSpacing: 0.8, rowPixelSpacing: 0.8 } as Image
    const MOCK_IMAGE_3 = { columnPixelSpacing: 0.9, rowPixelSpacing: 0.9 } as Image

    const MOCK_START_POINT_1: Point = [0, 0]
    const MOCK_START_POINT_2: Point = [1, 1]
    const MOCK_START_POINT_3: Point = [2, 2]

    const MOCK_END_POINT_1: Point = [5, 5]
    const MOCK_END_POINT_2: Point = [10, 10]
    const MOCK_END_POINT_3: Point = [20, 20]

    expect(getLineLength(MOCK_START_POINT_1, MOCK_END_POINT_1, MOCK_IMAGE_1)).toEqual({
      length: 4.949747468305833,
      unit: 'mm',
    })
    expect(getLineLength(MOCK_START_POINT_2, MOCK_END_POINT_2, MOCK_IMAGE_2)).toEqual({
      length: 10.182337649086284,
      unit: 'mm',
    })
    expect(getLineLength(MOCK_START_POINT_3, MOCK_END_POINT_3, MOCK_IMAGE_3)).toEqual({
      length: 22.91025971044414,
      unit: 'mm',
    })
  })

  it('should return the length of a line with ImagerPixelSpacing', () => {
    const MOCK_IMAGE_1 = { data: { string: () => '0.7\\0.7' } } as unknown as Image
    const MOCK_IMAGE_2 = { data: { string: () => '0.8\\0.8' } } as unknown as Image
    const MOCK_IMAGE_3 = { data: { string: () => '0.9\\0.9' } } as unknown as Image

    const MOCK_START_POINT_1: Point = [0, 0]
    const MOCK_START_POINT_2: Point = [1, 1]
    const MOCK_START_POINT_3: Point = [2, 2]

    const MOCK_END_POINT_1: Point = [5, 5]
    const MOCK_END_POINT_2: Point = [10, 10]
    const MOCK_END_POINT_3: Point = [20, 20]

    expect(getLineLength(MOCK_START_POINT_1, MOCK_END_POINT_1, MOCK_IMAGE_1)).toEqual({
      length: 4.949747468305833,
      unit: 'mm',
    })
    expect(getLineLength(MOCK_START_POINT_2, MOCK_END_POINT_2, MOCK_IMAGE_2)).toEqual({
      length: 10.182337649086284,
      unit: 'mm',
    })
    expect(getLineLength(MOCK_START_POINT_3, MOCK_END_POINT_3, MOCK_IMAGE_3)).toEqual({
      length: 22.91025971044414,
      unit: 'mm',
    })
  })

  it('should return the length of a line without PixelSpacing and ImagerPixelSpacing', () => {
    const MOCK_IMAGE = {
      data: {
        string: () => undefined,
      },
    } as unknown as Image

    const MOCK_START_POINT_1: Point = [0, 0]
    const MOCK_START_POINT_2: Point = [1, 1]
    const MOCK_START_POINT_3: Point = [2, 2]

    const MOCK_END_POINT_1: Point = [5, 5]
    const MOCK_END_POINT_2: Point = [10, 10]
    const MOCK_END_POINT_3: Point = [20, 20]

    expect(getLineLength(MOCK_START_POINT_1, MOCK_END_POINT_1, MOCK_IMAGE)).toEqual({
      length: 7.0710678118654755,
      unit: 'px',
    })
    expect(getLineLength(MOCK_START_POINT_2, MOCK_END_POINT_2, MOCK_IMAGE)).toEqual({
      length: 12.727922061357855,
      unit: 'px',
    })
    expect(getLineLength(MOCK_START_POINT_3, MOCK_END_POINT_3, MOCK_IMAGE)).toEqual({
      length: 25.45584412271571,
      unit: 'px',
    })
  })
})
