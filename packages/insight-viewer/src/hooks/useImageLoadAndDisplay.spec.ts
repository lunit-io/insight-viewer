import { renderHook } from '@testing-library/react-hooks'
import useImageLoadAndDisplay from './useImageLoadAndDisplay'
import { DefaultProp } from '../Viewer/const'

const { onError, requestInterceptor } = DefaultProp
const IMAGE_ID =
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000000.dcm'

const defaultParam = {
  onError,
  requestInterceptor,
  hasLoader: true,
}

describe('useImageLoadAndDisplay:', () => {
  it('with no element', () => {
    const { result } = renderHook(() =>
      useImageLoadAndDisplay({
        ...defaultParam,
        imageId: IMAGE_ID,
        element: null,
      })
    )
    expect(result.current).toBeUndefined()
  })

  it('with no loader', () => {
    const { result } = renderHook(() =>
      useImageLoadAndDisplay({
        ...defaultParam,
        imageId: IMAGE_ID,
        element: null,
        hasLoader: false,
      })
    )
    expect(result.current).toBeUndefined()
  })

  it('with invalid image', () => {
    const { result } = renderHook(() =>
      useImageLoadAndDisplay({
        ...defaultParam,
        imageId: '',
        element: null,
        hasLoader: false,
      })
    )
    expect(result.current).toBeUndefined()
  })
})
