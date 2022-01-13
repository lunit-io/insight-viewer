import { checkFocusedContour } from './checkFocusedContour'
import {
  MOCK_CONTOUR_LIST,
  ID1_CONTOUR,
  ID2_CONTOUR,
  NOT_FOCUS_POSITION,
  ID1_CONTOUR_FOCUS_POSITION,
  ID2_CONTOUR_FOCUS_POSITION,
} from '../../mocks/contours'

describe('checkFocusedContour:', () => {
  it('the id 1 contour should be focused', () => {
    expect(
      checkFocusedContour(MOCK_CONTOUR_LIST, ID1_CONTOUR_FOCUS_POSITION)
    ).toEqual(ID1_CONTOUR)
  })
  it('the id 2 contour should be focused', () => {
    expect(
      checkFocusedContour(MOCK_CONTOUR_LIST, ID2_CONTOUR_FOCUS_POSITION)
    ).toEqual(ID2_CONTOUR)
  })
  it('the contour shouldn`t be focused', () => {
    expect(checkFocusedContour(MOCK_CONTOUR_LIST, NOT_FOCUS_POSITION)).toEqual(
      null
    )
  })
})
