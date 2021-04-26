import React, { forwardRef, ForwardRefRenderFunction } from 'react'
import styled from 'styled-components'
import ReactResizeDetector from 'react-resize-detector'
import { resize } from '../../modules/cornerstoneHelper'
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
) => {
  const handleResize = () => {
    if (ref)
      resize((ref as React.MutableRefObject<HTMLDivElement>).current)
  }

  return (
    <StyledWrapper ref={ref}>
      <ReactResizeDetector
        handleWidth
        handleHeight
        onResize={handleResize}
      />
      <canvas className="cornerstone-canvas" />
      {children}
    </StyledWrapper>
  )
}

const Forwarded = forwardRef(Wrapper)

export default Forwarded
