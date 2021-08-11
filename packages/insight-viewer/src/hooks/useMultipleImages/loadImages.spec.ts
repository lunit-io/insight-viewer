import { CONFIG } from '../../const'
import { CornerstoneImage } from '../../utils/cornerstoneHelper'
import { CORNERSTONE_IMAGE_MOCK } from '../../mocks/const'
import { ViewerError } from '../../types'
import { loadImages } from './loadImages'
import { Loaded } from './types'

const { requestInterceptor } = CONFIG
const IMAGES = [
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000000.dcm',
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000001.dcm',
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000002.dcm',
]
const cornerstoneImage = CORNERSTONE_IMAGE_MOCK as unknown as CornerstoneImage
const getLoadImageMock = jest.fn()

const ErrorTexts = ['first', 'second', 'last', 'all']

/** It mocks getLoadImage() which returns Promise.
 * When loop counter equals to errorIndex, the Promise is rejected.
 * Otherwise, the Promise is resolved.
 * @param errorIndex The index to reject. If it is -1, no error.
 * @returns Promise<CornerstoneImage>
 */
function handleMock({ errorIndex = -1 }) {
  let count = -1
  return getLoadImageMock.mockImplementation(() => {
    count += 1
    if (errorIndex === count) {
      return Promise.reject(
        new Error(`${ErrorTexts[errorIndex]} image fetch fails`)
      )
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
      // TODO: Needs to implement observable mock.
      loadImages({
        images: IMAGES,
        requestInterceptor,
        getLoadImage: handleMock({ errorIndex: -1 }),
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
      loadImages({
        images: IMAGES,
        requestInterceptor,
        getLoadImage: handleMock({ errorIndex: 0 }),
      }).subscribe({
        error: async (err: ViewerError) => {
          expect(err.message).toBe('first image fetch fails')
          expect(count).toBe(0)
        },
      })
    })

    it('fails on second request', () => {
      loadImages({
        images: IMAGES,
        requestInterceptor,
        getLoadImage: handleMock({ errorIndex: 1 }),
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
      loadImages({
        images: IMAGES,
        requestInterceptor,
        getLoadImage: handleMock({ errorIndex: 2 }),
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
      loadImages({
        images: IMAGES,
        requestInterceptor,
        getLoadImage: handleMock({ errorIndex: 3 }),
      }).subscribe({
        error: async (err: ViewerError) => {
          expect(err.message).toBe('all images fetch fails')
          expect(count).toBe(0)
        },
      })
    })
  })
})
