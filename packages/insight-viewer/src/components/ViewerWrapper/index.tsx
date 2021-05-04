import React, { forwardRef } from 'react'
import styled from 'styled-components'
import { WithChildren, ViewerType } from '../../types'
import LoadingProgress from '../LoadingProgress'
import { VIEWER_TYPE } from '../../const'
import useResize from './useResize'

const StyledWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #000;
  user-select: none;
`

const ViewerWrapper = forwardRef<
  HTMLDivElement,
  WithChildren<{
    type: ViewerType
  }>
>(({ type, children }, ref) => {
  const { resizeRef } = useResize(ref)

  return (
    <StyledWrapper ref={resizeRef}>
      {type === VIEWER_TYPE.DICOM && <LoadingProgress />}
      <canvas className="cornerstone-canvas" />
      {children}
    </StyledWrapper>
  )
})

ViewerWrapper.displayName = 'ViewerWrapper'
export default ViewerWrapper
