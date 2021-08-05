/* eslint-disable no-shadow */
import { loadImage } from './loadImage'
import { CONFIG } from '../../const'
import { CornerstoneImage } from '../../utils/cornerstoneHelper'
import { CORNERSTONE_IMAGE_MOCK } from '../../mocks/const'

const IMAGE_ID =
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000000.dcm'
const defaultParam = {
  onError: CONFIG.onError,
  requestInterceptor: CONFIG.requestInterceptor,
  imageId: IMAGE_ID,
}
const cornerstoneImage = CORNERSTONE_IMAGE_MOCK as unknown as CornerstoneImage
const getImageMock = jest.fn()

describe('loadImage()', () => {
  it('with invalid image', () => {
    const action = () =>
      loadImage({
        ...defaultParam,
        getImage: getImageMock.mockImplementation(async () => {
          throw new Error('request fails')
        }),
      })
    expect(action()).rejects.toThrow('request fails')
  })

  it('with valid image', () => {
    loadImage({
      ...defaultParam,
      getImage: getImageMock.mockImplementation(async () => cornerstoneImage),
    }).then(res => {
      expect(res).toMatchObject(CORNERSTONE_IMAGE_MOCK)
    })
  })
})
