import React, { forwardRef } from 'react'
import { WithChildren, ViewerType } from '../../types'
import LoadingProgress from '../LoadingProgress'
import Wrapper from './Wrapper'
import { VIEWER_TYPE } from '../../const'
import useResize from './useResize'

export const elementId = `cornerstone-element-${Date.now()}`

const ViewerWrapper = forwardRef<
  HTMLDivElement,
  WithChildren<{
    type: ViewerType
  }>
>(({ type, children }, ref) => {
  const { resizeRef } = useResize(ref)

  return (
    <Wrapper ref={resizeRef} id={elementId}>
      {type === VIEWER_TYPE.DICOM && <LoadingProgress />}
      <canvas className="cornerstone-canvas" />
      {children}
    </Wrapper>
  )
})

ViewerWrapper.displayName = 'ViewerWrapper'
export default ViewerWrapper
