import { IMAGE_TYPE } from '../../const'
import { ImageId } from '../../types'
import { getItem, getImageId } from './getImageId'

const file = 'wadouri:https://example/CT000000.dcm'

describe('getItem()', () => {
  it('return undefined when item is undefined', () => {
    expect(getItem(undefined)).toBeUndefined()
  })

  it('return string when item is string', () => {
    expect(getItem('abc')).toBe('abc')
  })

  it('return first string item when item is array', () => {
    expect(getItem(['abc', 'def'])).toBe('abc')
  })
})

describe('getImageId()', () => {
  it('return dicom when image type is wadouri', () => {
    const imageType: ImageId = {
      [IMAGE_TYPE.WADO]: file,
    }
    expect(getImageId(imageType)).toEqual(file)
  })

  it('return dicom when image type is dicomfile', () => {
    const imageType: ImageId = {
      [IMAGE_TYPE.DICOMFILE]: file,
    }
    expect(getImageId(imageType)).toEqual(file)
  })

  it('return web when image type is web', () => {
    const imageType: ImageId = {
      [IMAGE_TYPE.WEB]: file,
    }
    expect(getImageId(imageType)).toEqual(file)
  })
})
