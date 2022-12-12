import { Point, Annotation, Measurement } from '../../types'
import { getEditPointPosition } from './getEditPointPosition'

describe('getEditPointPosition: ', () => {
  it('should return ruler points when editTarget is null', () => {
    const MOCK_POINT_1: Point[] = [
      [0, 0],
      [10, 10],
    ]
    const MOCK_POINT_2: Point[] = [
      [30, 30],
      [50, 50],
    ]

    expect(getEditPointPosition(MOCK_POINT_1, null)).toEqual([
      [0, 0],
      [10, 10],
    ])
    expect(getEditPointPosition(MOCK_POINT_2, null)).toEqual([
      [30, 30],
      [50, 50],
    ])
  })

  it('should return the points with line type editTarget', () => {
    const MOCK_POINT_1: Point[] = [
      [0, 0],
      [10, 10],
    ]
    const MOCK_POINT_2: Point[] = [
      [30, 30],
      [50, 50],
    ]

    const MOCK_EDIT_TARGET: Annotation = {
      id: 1,
      labelPosition: [0, 0],
      lineWidth: 1.5,
      points: [
        [0, 0],
        [50, 50],
      ],
      type: 'line',
    }

    expect(getEditPointPosition(MOCK_POINT_1, MOCK_EDIT_TARGET)).toEqual([
      [0, 0],
      [10, 10],
    ])
    expect(getEditPointPosition(MOCK_POINT_2, MOCK_EDIT_TARGET)).toEqual([
      [30, 30],
      [50, 50],
    ])
  })

  it('should return the points with fixedPoints when drawing mode is circle', () => {
    const MOCK_POINT_1: Point[] = [
      [0, 0],
      [10, 10],
    ]
    const MOCK_POINT_2: Point[] = [
      [30, 30],
      [50, 50],
    ]

    const MOCK_FIXED_POINTS: [Point, Point] = [
      [10, 10],
      [30, 50],
    ]

    const MOCK_EDIT_TARGET: Measurement = {
      centerPoint: [0, 0],
      id: 1,
      lineWidth: 1.5,
      measuredValue: 14.142135623730951,
      radius: 14.142135623730951,
      textPoint: null,
      type: 'circle',
      unit: 'px',
    }

    expect(getEditPointPosition(MOCK_POINT_1, MOCK_EDIT_TARGET, 'circle', undefined, MOCK_FIXED_POINTS)).toEqual([
      [-10, -10.000000000000002],
      [10.000000000000002, 10],
    ])
    expect(getEditPointPosition(MOCK_POINT_2, MOCK_EDIT_TARGET, 'circle', undefined, MOCK_FIXED_POINTS)).toEqual([
      [10, 9.999999999999996],
      [50, 50],
    ])
  })

  it('should return the points with circle type editTarget and editingMode is move, textMove, or null', () => {
    const MOCK_POINT_1: Point[] = [
      [0, 0],
      [10, 10],
    ]
    const MOCK_POINT_2: Point[] = [
      [30, 30],
      [50, 50],
    ]

    const MOCK_EDIT_TARGET: Measurement = {
      centerPoint: [0, 0],
      id: 1,
      lineWidth: 1.5,
      measuredValue: 14.142135623730951,
      radius: 14.142135623730951,
      textPoint: null,
      type: 'circle',
      unit: 'px',
    }

    expect(getEditPointPosition(MOCK_POINT_1, MOCK_EDIT_TARGET, undefined, 'move')).toEqual([
      [-10, -10.000000000000002],
      [10.000000000000002, 10],
    ])
    expect(getEditPointPosition(MOCK_POINT_2, MOCK_EDIT_TARGET, undefined, 'textMove')).toEqual([
      [10, 9.999999999999996],
      [50, 50],
    ])
  })

  it('should return the points with circle type editTarget and editingMode is startPoint or endPoint', () => {
    const MOCK_POINT_1: Point[] = [
      [0, 0],
      [10, 10],
    ]
    const MOCK_POINT_2: Point[] = [
      [30, 30],
      [50, 50],
    ]
    const MOCK_FIXED_POINTS: [Point, Point] = [
      [10, 10],
      [30, 50],
    ]

    const MOCK_EDIT_TARGET: Measurement = {
      centerPoint: [0, 0],
      id: 1,
      lineWidth: 1.5,
      measuredValue: 14.142135623730951,
      radius: 14.142135623730951,
      textPoint: null,
      type: 'circle',
      unit: 'px',
    }

    expect(getEditPointPosition(MOCK_POINT_1, MOCK_EDIT_TARGET, undefined, 'startPoint', MOCK_FIXED_POINTS)).toEqual([
      [10, 10],
      [30, 50],
    ])
    expect(getEditPointPosition(MOCK_POINT_2, MOCK_EDIT_TARGET, undefined, 'endPoint', MOCK_FIXED_POINTS)).toEqual([
      [30, 50],
      [10, 10],
    ])
  })
})
