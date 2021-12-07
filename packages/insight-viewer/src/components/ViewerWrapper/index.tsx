import React, { forwardRef } from 'react'
import { WithChildren, ProgressComponent, OnViewportChange } from '../../types'
import LoadingProgress from '../LoadingProgress'
import useResize from './useResize'

const style = {
  position: 'relative',
  width: '100%',
  height: '100%',
  backgroundColor: '#000',
  userSelect: 'none',
} as const

const Forwarded = forwardRef<
  HTMLDivElement,
  WithChildren<{
    Progress?: ProgressComponent
    onViewportChange: OnViewportChange | undefined
  }>
>(({ Progress, onViewportChange, children }, ref) => {
  const { resizeRef } = useResize(ref, onViewportChange)

  return (
    <div
      ref={resizeRef}
      style={style}
      className="cornerstone-canvas-wrapper"
      data-cy="cornerstone-canvas-wrapper"
    >
      {Progress && <LoadingProgress Progress={Progress} />}
      <canvas className="cornerstone-canvas" />
      {children}
    </div>
  )
})

const ViewerWrapper = React.memo(Forwarded)
// for eslintrc(eact/display-name)
Forwarded.displayName = 'Forwarded'
ViewerWrapper.displayName = 'ViewerWrapper'

export default ViewerWrapper
