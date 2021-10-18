import { IMAGE_TYPE } from '../../const'
import { ImageId } from '../../types'
import { getItems, getImageIds } from './getImageIds'

const file = 'wadouri:https://example/CT000000.dcm'

describe('getItems()', () => {
  it('return empty arry when item is undefined', () => {
    expect(getItems(undefined)).toEqual([])
  })

  it('return array when item is array', () => {
    expect(getItems(['abc', 'def'])).toEqual(['abc', 'def'])
  })

  it('return string wrapping array item when item is string', () => {
    expect(getItems('abc')).toEqual(['abc'])
  })
})

describe('getImageIds()', () => {
  it('return dicom when image types are wadouri', () => {
    const imageTypes: ImageId = {
      [IMAGE_TYPE.WADO]: [file],
    }
    expect(getImageIds(imageTypes)).toEqual([file])
  })

  it('return dicom when image types are dicomfile', () => {
    const imageTypes: ImageId = {
      [IMAGE_TYPE.DICOMFILE]: [file],
    }
    expect(getImageIds(imageTypes)).toEqual([file])
  })

  it('return web when image types are web', () => {
    const imageTypes: ImageId = {
      [IMAGE_TYPE.WEB]: [file],
    }
    expect(getImageIds(imageTypes)).toEqual([file])
  })
})
