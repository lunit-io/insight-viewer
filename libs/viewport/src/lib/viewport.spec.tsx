import { render } from '@testing-library/react'

import Viewport from './viewport'

describe('Viewport', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Viewport />)
    expect(baseElement).toBeTruthy()
  })
})
