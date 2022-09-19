import { IMAGE_LOADER_SCHEME } from '../../const'
import { ImageId } from '../../types'
import { getItem, getImageIdAndScheme } from './getImageIdAndScheme'

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

describe('getImageIdAndScheme()', () => {
  it('return dicom when image type is wadouri', () => {
    const imageType: ImageId = {
      [IMAGE_LOADER_SCHEME.WADO]: file,
    }
    expect(getImageIdAndScheme(imageType).imageId).toEqual(file)
    expect(getImageIdAndScheme(imageType).scheme).toEqual(IMAGE_LOADER_SCHEME.WADO)
  })

  it('return dicom when image type is dicomfile', () => {
    const imageType: ImageId = {
      [IMAGE_LOADER_SCHEME.DICOMFILE]: file,
    }
    expect(getImageIdAndScheme(imageType).imageId).toEqual(file)
    expect(getImageIdAndScheme(imageType).scheme).toEqual(IMAGE_LOADER_SCHEME.DICOMFILE)
  })

  it('return web when image type is web', () => {
    const imageType: ImageId = {
      [IMAGE_LOADER_SCHEME.WEB]: file,
    }
    expect(getImageIdAndScheme(imageType).imageId).toEqual(file)
    expect(getImageIdAndScheme(imageType).scheme).toEqual(IMAGE_LOADER_SCHEME.WEB)
  })
})
