import React, { forwardRef, ForwardRefRenderFunction } from 'react'
import styled from 'styled-components'
import { WithChildren } from '../../types'

const StyledWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #000;
  user-select: none;
`

const Wrapper: ForwardRefRenderFunction<HTMLDivElement, WithChildren> = (
  { children },
  ref
) => (
  <StyledWrapper ref={ref}>
    <canvas className="cornerstone-canvas" />
    {children}
  </StyledWrapper>
)

const Forwarded = forwardRef(Wrapper)

export default Forwarded
