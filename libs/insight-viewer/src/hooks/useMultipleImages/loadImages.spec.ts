import { CONFIG, IMAGE_LOADER_SCHEME } from '../../const'
import { CornerstoneImage } from '../../utils/cornerstoneHelper'
import { CORNERSTONE_IMAGE_MOCK } from '../../mocks/const'
import { ViewerError } from '../../types'
import { loadImages } from './loadImages'
import { Loaded } from './types'
import { loadCornerstoneImages } from './loadCornerstoneImages'

const { requestInterceptor } = CONFIG
const IMAGES = [
  'wadouri:https://example/CT000000.dcm',
  'wadouri:https://example/CT000001.dcm',
  'wadouri:https://example/CT000002.dcm',
]
const cornerstoneImage = CORNERSTONE_IMAGE_MOCK as unknown as CornerstoneImage
const mockLoadCornerstoneImages = loadCornerstoneImages as jest.Mock
jest.mock('./loadCornerstoneImages', () => ({
  loadCornerstoneImages: jest.fn(),
}))

const ErrorTexts = ['first', 'second', 'last', 'all']

/** It mocks getLoadImage() which returns Promise.
 * When loop counter equals to errorIndex, the Promise is rejected.
 * Otherwise, the Promise is resolved.
 * @param errorIndex The index to reject. If it is -1, no error.
 * @returns Promise<CornerstoneImage>
 */
function handleMock({ errorIndex = -1 }) {
  let count = -1
  return mockLoadCornerstoneImages.mockImplementation(() => {
    count += 1
    if (errorIndex === count) {
      return Promise.reject(new Error(`${ErrorTexts[errorIndex]} image fetch fails`))
    }
    return Promise.resolve(cornerstoneImage)
  })
}

describe('loadImages()', () => {
  describe('return images and loaded count', () => {
    let count: number

    beforeEach(() => {
      count = 0
    })

    it('fetches all images successfully', () => {
      handleMock({ errorIndex: -1 })

      // TODO: Needs to implement observable mock.
      loadImages({
        images: IMAGES,
        imageScheme: IMAGE_LOADER_SCHEME.WADO,
        timeout: CONFIG.timeout,
        requestInterceptor,
      }).subscribe({
        next: async (res: Loaded) => {
          count += 1
          expect(res).toMatchObject({
            image: cornerstoneImage,
            loaded: count,
          })
        },
      })
    })

    it('fails on first request', () => {
      handleMock({ errorIndex: 0 })

      loadImages({
        images: IMAGES,
        imageScheme: IMAGE_LOADER_SCHEME.WADO,
        timeout: CONFIG.timeout,
        requestInterceptor,
      }).subscribe({
        error: async (err: ViewerError) => {
          expect(err.message).toBe('first image fetch fails')
          expect(count).toBe(0)
        },
      })
    })

    it('fails on second request', () => {
      handleMock({ errorIndex: 1 })

      loadImages({
        images: IMAGES,
        imageScheme: IMAGE_LOADER_SCHEME.WADO,
        timeout: CONFIG.timeout,
        requestInterceptor,
      }).subscribe({
        next: async (res: Loaded) => {
          count += 1
          expect(res).toMatchObject({
            image: cornerstoneImage,
            loaded: count,
          })
        },
        error: async (err: ViewerError) => {
          expect(err.message).toBe('second image fetch fails')
          expect(count).toBe(1)
        },
      })
    })

    it('fails on the last request', () => {
      handleMock({ errorIndex: 2 })

      loadImages({
        images: IMAGES,
        imageScheme: IMAGE_LOADER_SCHEME.WADO,
        timeout: CONFIG.timeout,
        requestInterceptor,
      }).subscribe({
        next: async (res: Loaded) => {
          count += 1
          expect(res).toMatchObject({
            image: cornerstoneImage,
            loaded: count,
          })
        },
        error: async (err: ViewerError) => {
          expect(err.message).toBe('last image fetch fails')
          expect(count).toBe(2)
        },
      })
    })

    it('fails for all images', () => {
      handleMock({ errorIndex: 3 })

      loadImages({
        images: IMAGES,
        imageScheme: IMAGE_LOADER_SCHEME.WADO,
        timeout: CONFIG.timeout,
        requestInterceptor,
      }).subscribe({
        error: async (err: ViewerError) => {
          expect(err.message).toBe('all images fetch fails')
          expect(count).toBe(0)
        },
      })
    })
  })
})
