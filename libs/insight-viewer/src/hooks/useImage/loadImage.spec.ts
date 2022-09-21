/* eslint-disable no-shadow */
import { CONFIG } from '../../const'
import { CornerstoneImage } from '../../utils/cornerstoneHelper'
import { CORNERSTONE_IMAGE_MOCK } from '../../mocks/const'
import { loadImage } from './loadImage'
import { loadCornerstoneImage } from './loadCornerstoneImage'

const IMAGE_ID = 'wadouri:https://example/CT000000.dcm'
const defaultParam = {
  onError: CONFIG.onError,
  imageId: IMAGE_ID,
  loader: undefined,
}
const cornerstoneImage = CORNERSTONE_IMAGE_MOCK as unknown as CornerstoneImage
const mockLoadCornerstoneImage = loadCornerstoneImage as jest.Mock
jest.mock('./loadCornerstoneImage', () => ({
  loadCornerstoneImage: jest.fn(),
}))

describe('loadImage()', () => {
  it('with invalid image', () => {
    mockLoadCornerstoneImage.mockImplementation(async () => {
      throw new Error('request fails')
    })

    const action = () =>
      loadImage({
        ...defaultParam,
      })
    expect(action()).rejects.toThrow('request fails')
  })

  it('with valid image', () => {
    mockLoadCornerstoneImage.mockImplementation(async () => cornerstoneImage)

    loadImage({
      ...defaultParam,
    }).then((res) => {
      expect(res).toMatchObject(CORNERSTONE_IMAGE_MOCK)
    })
  })
})
