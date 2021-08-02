/* eslint-disable no-shadow */
import { loadImage } from '.'
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

describe('useSingleFrame:', () => {
  it('with invalid image', () => {
    const getImage = async () => {
      throw new Error('request fails')
    }

    const action = () =>
      loadImage({
        ...defaultParam,
        getImage,
      })
    expect(action()).rejects.toThrow('request fails')
  })

  it('with valid image', () => {
    const getImage = async () => cornerstoneImage

    loadImage({
      ...defaultParam,
      getImage,
    }).then(res => {
      expect(res).toMatchObject(CORNERSTONE_IMAGE_MOCK)
    })
  })
})
