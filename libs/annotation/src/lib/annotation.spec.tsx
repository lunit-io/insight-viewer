import { render } from '@testing-library/react'

import Annotation from './annotation'

describe('Annotation', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Annotation />)
    expect(baseElement).toBeTruthy()
  })
})
