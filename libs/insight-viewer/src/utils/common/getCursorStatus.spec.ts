import { getCursorStatus } from './getCursorStatus'

import type { Annotation } from '../../Annotation/types'
import type { Point } from './../../types'
import type { EditPoints } from './getEditPointPosition'

describe('getCursorStatus :', () => {
  it('should return null when drawing is null and selectedDrawing is null', () => {
    expect(
      getCursorStatus({
        drawing: null,
        selectedDrawing: null,
        editMode: null,
        editStartPoint: null,
        editTargetPoints: null,
      })
    ).toBeNull()
  })

  it('should return "drawing" when drawing is not null and selectedDrawing is null', () => {
    expect(
      getCursorStatus({
        drawing: {} as Annotation,
        selectedDrawing: null,
        editMode: null,
        editStartPoint: null,
        editTargetPoints: null,
      })
    ).toBe('drawing')
    expect(
      getCursorStatus({
        drawing: {} as Annotation,
        selectedDrawing: null,
        editMode: null,
        editStartPoint: null,
        editTargetPoints: null,
      })
    ).toBe('drawing')
  })

  it('should return "editing" when editMode is not null and editStartPoint or editTargetPoints is not null', () => {
    expect(
      getCursorStatus({
        drawing: null,
        selectedDrawing: null,
        editMode: 'startPoint',
        editStartPoint: [] as unknown as Point,
        editTargetPoints: null,
      })
    ).toBe('editing')
    expect(
      getCursorStatus({
        drawing: null,
        selectedDrawing: null,
        editMode: 'endPoint',
        editStartPoint: null,
        editTargetPoints: [] as unknown as EditPoints,
      })
    ).toBe('editing')
  })

  it('should return "moving" when editMode is not null and editStartPoint or editTargetPoints is not null', () => {
    expect(
      getCursorStatus({
        drawing: null,
        selectedDrawing: null,
        editMode: 'move',
        editStartPoint: null,
        editTargetPoints: [] as unknown as EditPoints,
      })
    ).toBe('moving')
    expect(
      getCursorStatus({
        drawing: null,
        selectedDrawing: null,
        editMode: 'textMove',
        editStartPoint: null,
        editTargetPoints: [] as unknown as EditPoints,
      })
    ).toBe('moving')
  })
})
