import { IMAGE_TYPE, LOADER_TYPE } from '../../const'
import { ImageType } from '../../types'
import { getLoaderType } from './getLoaderType'

const file = 'wadouri:https://example/CT000000.dcm'

describe('getLoaderType()', () => {
  it('return dicom when image type is wadouri', () => {
    const imageType: ImageType = {
      [IMAGE_TYPE.WADOURI]: file,
    }
    expect(getLoaderType(imageType)).toEqual(LOADER_TYPE.DICOM)
  })

  it('return dicom when image type is dicomfile', () => {
    const imageType: ImageType = {
      [IMAGE_TYPE.DICOMFILE]: file,
    }
    expect(getLoaderType(imageType)).toEqual(LOADER_TYPE.DICOM)
  })

  it('return web when image type is web', () => {
    const imageType: ImageType = {
      [IMAGE_TYPE.WEB]: file,
    }
    expect(getLoaderType(imageType)).toEqual(LOADER_TYPE.WEB)
  })
})
