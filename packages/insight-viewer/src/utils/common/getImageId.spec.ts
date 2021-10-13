import { IMAGE_TYPE } from '../../const'
import { ImageType, ImageTypes } from '../../types'
import { getImageId, getImageIds } from './getImageId'

// TODO: 파일 string 값 유효성 체크해야 하는가?
// TODO: wadouri를 자동으로 붙여주기?
const file = 'wadouri:https://example/CT000000.dcm'

describe('getImageId()', () => {
  it('return dicom when image type is wadouri', () => {
    const imageType: ImageType = {
      [IMAGE_TYPE.WADOURI]: file,
    }
    expect(getImageId(imageType)).toEqual(file)
  })

  it('return dicom when image type is dicomfile', () => {
    const imageType: ImageType = {
      [IMAGE_TYPE.DICOMFILE]: file,
    }
    expect(getImageId(imageType)).toEqual(file)
  })

  it('return web when image type is web', () => {
    const imageType: ImageType = {
      [IMAGE_TYPE.WEB]: file,
    }
    expect(getImageId(imageType)).toEqual(file)
  })
})

describe('getImageIds()', () => {
  it('return dicom when image types are wadouri', () => {
    const imageTypes: ImageTypes = {
      [IMAGE_TYPE.WADOURI]: [file],
    }
    expect(getImageIds(imageTypes)).toEqual([file])
  })

  it('return dicom when image types are dicomfile', () => {
    const imageTypes: ImageTypes = {
      [IMAGE_TYPE.DICOMFILE]: [file],
    }
    expect(getImageIds(imageTypes)).toEqual([file])
  })

  it('return web when image types are web', () => {
    const imageTypes: ImageTypes = {
      [IMAGE_TYPE.WEB]: [file],
    }
    expect(getImageIds(imageTypes)).toEqual([file])
  })
})
