import { IMAGE_LOADER_SCHEME } from '../../const'
import { ImageId } from '../../types'
import { getItems, getImageIdsAndScheme } from './getImageIdsAndScheme'

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

describe('getImageIdsAndScheme()', () => {
  it('return dicom when image types are wadouri', () => {
    const imageTypes: ImageId = {
      [IMAGE_LOADER_SCHEME.WADO]: [file],
    }
    expect(getImageIdsAndScheme(imageTypes).ids).toEqual([file])
    expect(getImageIdsAndScheme(imageTypes).scheme).toEqual(IMAGE_LOADER_SCHEME.WADO)
  })

  it('return dicom when image types are dicomfile', () => {
    const imageTypes: ImageId = {
      [IMAGE_LOADER_SCHEME.DICOMFILE]: [file],
    }
    expect(getImageIdsAndScheme(imageTypes).ids).toEqual([file])
    expect(getImageIdsAndScheme(imageTypes).scheme).toEqual(IMAGE_LOADER_SCHEME.DICOMFILE)
  })

  it('return web when image types are web', () => {
    const imageTypes: ImageId = {
      [IMAGE_LOADER_SCHEME.WEB]: [file],
    }
    expect(getImageIdsAndScheme(imageTypes).ids).toEqual([file])
    expect(getImageIdsAndScheme(imageTypes).scheme).toEqual(IMAGE_LOADER_SCHEME.WEB)
  })
})
