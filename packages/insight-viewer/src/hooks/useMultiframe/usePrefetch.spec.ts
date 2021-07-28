import { prefetch } from './usePrefetch'
import { CONFIG } from '../../const'
import { CornerstoneImage } from '../../utils/cornerstoneHelper'
import { CORNERSTONE_IMAGE_MOCK } from '../../mocks/const'

const { requestInterceptor } = CONFIG
const IMAGES = [
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000000.dcm',
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000001.dcm',
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000002.dcm',
]

const cornerstoneImage = CORNERSTONE_IMAGE_MOCK as unknown as CornerstoneImage

describe('usePrefetch', () => {
  it('getLoadImage succeeds', async () => {
    const getLoadImage = async () => cornerstoneImage
    const res = await prefetch({
      images: IMAGES,
      requestInterceptor,
      getLoadImage,
    })

    expect(res?.length).toBe(IMAGES.length)
    expect(res?.[0]).toMatchObject(CORNERSTONE_IMAGE_MOCK)
  })

  it('getLoadImage fails', async () => {
    const getLoadImage = () => Promise.reject(new Error('request fails'))

    const action = async () =>
      prefetch({
        images: IMAGES,
        requestInterceptor,
        getLoadImage,
      })

    await expect(action()).rejects.toThrow('request fails')
  })
})
