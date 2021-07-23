/* eslint-disable no-shadow */
import { loadAndDisplayImage } from './useImageLoadAndDisplay'
import { DefaultProp } from '../Viewer/const'
import { CORNERSTONE_VIEWPORT_MOCK } from '../mocks/const'

const { onError, requestInterceptor } = DefaultProp
const IMAGE_ID =
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000000.dcm'

const defaultParam = {
  onError,
  requestInterceptor,
  hasLoader: true,
  loadCountRef: { current: 1 },
  viewportRef: { current: undefined },
}

describe('useImageLoadAndDisplay:', () => {
  let container: HTMLDivElement
  beforeAll(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  it('with invalid image', async () => {
    const getImageViewport = async () => {
      throw new Error('request fails')
    }

    const action = () =>
      loadAndDisplayImage({
        ...defaultParam,
        imageId: '',
        element: container,
        getImageViewport,
      })
    expect(await action()).toBe(false)
  })

  it('with valid image', () => {
    const getImageViewport = async () => ({
      viewport: CORNERSTONE_VIEWPORT_MOCK,
      defaultViewport: CORNERSTONE_VIEWPORT_MOCK,
    })

    loadAndDisplayImage({
      ...defaultParam,
      imageId: IMAGE_ID,
      element: container,
      getImageViewport,
    }).then(res => {
      expect(res).toBe(true)
    })
  })
})
