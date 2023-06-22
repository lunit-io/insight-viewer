import type { Point } from '../types'
import { modifyConnectingLine } from './modifyConnectingLine'

describe('modifyConnectingLine', () => {
  it('should return connectingLineToTextBoxCenter when textBox is null ', () => {
    const connectingLineToTextBoxCenter: [Point, Point] = [
      [1, 2],
      [3, 4],
    ]
    const textBox = null

    expect(modifyConnectingLine({ textBox, connectingLineToTextBoxCenter })).toEqual(connectingLineToTextBoxCenter)
  })
  it('should return connecting line', () => {
    const connectingLineToTextBoxCenter: [Point, Point] = [
      [1, 2],
      [3, 4],
    ]
    const textBox = {
      width: 100,
      height: 100,
    }

    expect(modifyConnectingLine({ textBox, connectingLineToTextBoxCenter })).toEqual([
      [1, 2],
      [3, -46],
    ])
  })
})
