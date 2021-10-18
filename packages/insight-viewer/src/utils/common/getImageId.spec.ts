import { IMAGE_TYPE } from '../../const'
import { ImageId } from '../../types'
import { getItem, getItems, getImageId, getImageIds } from './getImageId'

// TODO: 파일 string 값 유효성 체크해야 하는가?
// TODO: wadouri를 자동으로 붙여주기?
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
