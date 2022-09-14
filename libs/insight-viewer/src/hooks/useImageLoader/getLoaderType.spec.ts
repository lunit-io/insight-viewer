import { IMAGE_LOADER_SCHEME, LOADER_TYPE } from '../../const'
import { ImageId } from '../../types'
import { getLoaderType } from './getLoaderType'

const file = 'wadouri:https://example/CT000000.dcm'

describe('getLoaderType()', () => {
  it('return dicom when image type is wadouri', () => {
    const imageType: ImageId = {
      [IMAGE_LOADER_SCHEME.WADO]: file,
    }
    expect(getLoaderType(imageType)).toEqual(LOADER_TYPE.DICOM)
  })

  it('return dicom when image types are wadouri', () => {
    const imageTypes: ImageId = {
      [IMAGE_LOADER_SCHEME.WADO]: [file],
    }
    expect(getLoaderType(imageTypes)).toEqual(LOADER_TYPE.DICOM)
  })

  it('return dicom when image type is dicomfile', () => {
    const imageType: ImageId = {
      [IMAGE_LOADER_SCHEME.DICOMFILE]: file,
    }
    expect(getLoaderType(imageType)).toEqual(LOADER_TYPE.DICOM)
  })

  it('return dicom when image types are dicomfile', () => {
    const imageTypes: ImageId = {
      [IMAGE_LOADER_SCHEME.DICOMFILE]: [file],
    }
    expect(getLoaderType(imageTypes)).toEqual(LOADER_TYPE.DICOM)
  })

  it('return web when image type is web', () => {
    const imageType: ImageId = {
      [IMAGE_LOADER_SCHEME.WEB]: file,
    }
    expect(getLoaderType(imageType)).toEqual(LOADER_TYPE.WEB)
  })

  it('return web when image types are web', () => {
    const imageTypes: ImageId = {
      [IMAGE_LOADER_SCHEME.WEB]: [file],
    }
    expect(getLoaderType(imageTypes)).toEqual(LOADER_TYPE.WEB)
  })
})
