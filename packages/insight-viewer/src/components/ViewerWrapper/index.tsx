import React, { forwardRef, useCallback } from 'react'
import styled from 'styled-components'
import { useResizeDetector } from 'react-resize-detector'
import { resize } from '../../utils/cornerstoneHelper'
import { WithChildren, ViewerType } from '../../types'
import LoadingProgress from '../LoadingProgress'
import { VIEWER_TYPE } from '../../const'

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
  const element = (ref as React.MutableRefObject<HTMLDivElement | null>)
    ?.current
  const handleResize = useCallback(() => {
    if (!element) return undefined
    return resize(element)
  }, [element])

  const { ref: resizeRef } = useResizeDetector({
    targetRef: ref as React.MutableRefObject<HTMLDivElement>,
    onResize: handleResize,
    skipOnMount: false,
  })

  return (
    <StyledWrapper ref={resizeRef}>
      {type === VIEWER_TYPE.DICOM && <LoadingProgress />}
      <canvas className="cornerstone-canvas" />
      {children}
    </StyledWrapper>
  )
})

export default ViewerWrapper
