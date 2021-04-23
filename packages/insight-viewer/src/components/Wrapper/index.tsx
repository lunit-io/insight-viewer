import React, { forwardRef, ForwardRefRenderFunction } from 'react'
import styled from 'styled-components'
import { WithChildren, WidthHeight } from '../../types'

export type Prop = WithChildren<
  WidthHeight & {
    ref?: React.RefObject<HTMLDivElement>
  }
>

function getSize(size: number | '100%'): string {
  if (typeof size === 'number') return `${size}px`
  return size
}

const StyledWrapper = styled.div<WidthHeight>`
  position: relative;
  width: ${props => getSize(props.width)};
  height: ${props => getSize(props.height)};
  background-color: #000;
  user-select: none;
`

const Wrapper: ForwardRefRenderFunction<HTMLDivElement, Prop> = (
  { width = '100%', height = '100%', children },
  ref
) => (
  <StyledWrapper ref={ref} width={width} height={height}>
    <canvas className="cornerstone-canvas" width="100%" height="100%" />
    {children}
  </StyledWrapper>
)

const Forwarded = forwardRef(Wrapper)

export default Forwarded
