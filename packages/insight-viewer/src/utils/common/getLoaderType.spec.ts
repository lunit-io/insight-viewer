import { IMAGE_TYPE, LOADER_TYPE } from '../../const'
import { ImageType, ImageTypes } from '../../types'
import { getLoaderType } from './getLoaderType'

const file = 'wadouri:https://example/CT000000.dcm'

describe('getLoaderType()', () => {
  it('return dicom when image type is wadouri', () => {
    const imageType: ImageType = {
      [IMAGE_TYPE.WADOURI]: file,
    }
    expect(getLoaderType(imageType)).toEqual(LOADER_TYPE.DICOM)
  })

  it('return dicom when image types are wadouri', () => {
    const imageTypes: ImageTypes = {
      [IMAGE_TYPE.WADOURI]: [file],
    }
    expect(getLoaderType(imageTypes)).toEqual(LOADER_TYPE.DICOM)
  })

  it('return dicom when image type is dicomfile', () => {
    const imageType: ImageType = {
      [IMAGE_TYPE.DICOMFILE]: file,
    }
    expect(getLoaderType(imageType)).toEqual(LOADER_TYPE.DICOM)
  })

  it('return dicom when image types are dicomfile', () => {
    const imageTypes: ImageTypes = {
      [IMAGE_TYPE.DICOMFILE]: [file],
    }
    expect(getLoaderType(imageTypes)).toEqual(LOADER_TYPE.DICOM)
  })

  it('return web when image type is web', () => {
    const imageType: ImageType = {
      [IMAGE_TYPE.WEB]: file,
    }
    expect(getLoaderType(imageType)).toEqual(LOADER_TYPE.WEB)
  })

  it('return web when image types are web', () => {
    const imageTypes: ImageTypes = {
      [IMAGE_TYPE.WEB]: [file],
    }
    expect(getLoaderType(imageTypes)).toEqual(LOADER_TYPE.WEB)
  })
})
