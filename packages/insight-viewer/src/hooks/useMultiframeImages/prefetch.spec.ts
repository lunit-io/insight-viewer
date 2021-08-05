import { CONFIG } from '../../const'
import { CornerstoneImage } from '../../utils/cornerstoneHelper'
import { CORNERSTONE_IMAGE_MOCK } from '../../mocks/const'
import { ViewerError } from '../../types'
import { prefetch } from './prefetch'
import { Prefetched } from './types'

const { requestInterceptor } = CONFIG
const IMAGES = [
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000000.dcm',
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000001.dcm',
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000002.dcm',
]
const cornerstoneImage = CORNERSTONE_IMAGE_MOCK as unknown as CornerstoneImage
const getLoadImageMock = jest.fn()

describe('prefetch()', () => {
  let count: number

  beforeEach(() => {
    count = -1
  })

  it('fetches all images successfully', () => {
    prefetch({
      images: IMAGES,
      requestInterceptor,
      getLoadImage: getLoadImageMock.mockImplementation(() => {
        count += 1
        Promise.resolve(cornerstoneImage)
      }),
    }).subscribe({
      next: async (res: Prefetched) => {
        expect(res).toMatchObject({
          image: cornerstoneImage,
          loaded: count + 1,
        })
      },
    })
  })

  it('fails on first request', () => {
    prefetch({
      images: IMAGES,
      requestInterceptor,
      getLoadImage: getLoadImageMock.mockImplementation(() => {
        count += 1
        if (count === 0)
          return Promise.reject(new Error('first image fetch fails'))
        return Promise.resolve(cornerstoneImage)
      }),
    }).subscribe({
      error: async (err: ViewerError) => {
        expect(err.message).toBe('first image fetch fails')
        expect(count).toBe(count)
      },
    })
  })

  it('fails on second request', () => {
    prefetch({
      images: IMAGES,
      requestInterceptor,
      getLoadImage: getLoadImageMock.mockImplementation(() => {
        count += 1
        if (count === 1)
          return Promise.reject(new Error('second image fetch fails'))
        return Promise.resolve(cornerstoneImage)
      }),
    }).subscribe({
      next: async (res: Prefetched) => {
        expect(res).toMatchObject({
          image: cornerstoneImage,
          loaded: count + 1,
        })
      },
      error: async (err: ViewerError) => {
        expect(err.message).toBe('second image fetch fails')
        expect(count).toBe(count)
      },
    })
  })

  it('fails on the last request', () => {
    prefetch({
      images: IMAGES,
      requestInterceptor,
      getLoadImage: getLoadImageMock.mockImplementation(() => {
        count += 1
        if (count === IMAGES.length - 1)
          return Promise.reject(new Error('last image fetch fails'))
        return Promise.resolve(cornerstoneImage)
      }),
    }).subscribe({
      next: async (res: Prefetched) => {
        expect(res).toMatchObject({
          image: cornerstoneImage,
          loaded: count + 1,
        })
      },
      error: async (err: ViewerError) => {
        expect(err.message).toBe('last image fetch fails')
        expect(count).toBe(count)
      },
    })
  })

  it('fails for all images', () => {
    prefetch({
      images: IMAGES,
      requestInterceptor,
      getLoadImage: getLoadImageMock.mockImplementation(() =>
        Promise.reject(new Error('all images fetch fails'))
      ),
    }).subscribe({
      error: async (err: ViewerError) => {
        expect(err.message).toBe('all images fetch fails')
      },
    })
  })
})
