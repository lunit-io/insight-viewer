import { checkFocusedPolygon } from './checkFocusedPolygon'
import {
  MOCK_POLYGON_LIST,
  ID1_POLYGON,
  ID2_POLYGON,
  NOT_FOCUS_POSITION,
  ID1_POLYGON_FOCUS_POSITION,
  ID2_POLYGON_FOCUS_POSITION,
} from '../../mocks/polygons'

describe('checkFocusedPolygon:', () => {
  it('the id 1 contour should be focused', () => {
    expect(checkFocusedPolygon(MOCK_POLYGON_LIST, ID1_POLYGON_FOCUS_POSITION)).toEqual(ID1_POLYGON)
  })
  it('the id 2 contour should be focused', () => {
    expect(checkFocusedPolygon(MOCK_POLYGON_LIST, ID2_POLYGON_FOCUS_POSITION)).toEqual(ID2_POLYGON)
  })
  it('the contour shouldn`t be focused', () => {
    expect(checkFocusedPolygon(MOCK_POLYGON_LIST, NOT_FOCUS_POSITION)).toEqual(null)
  })
})
