import React, { forwardRef } from 'react'
import { WithChildren, ProgressComponent } from '../../types'
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
  WithChildren<{ Progress?: ProgressComponent }>
>(({ Progress, children }, ref) => {
  const { resizeRef } = useResize(ref)

  return (
    <div ref={resizeRef} style={style} className="cornerstone-canvas-wrapper">
      {Progress && <LoadingProgress Progress={Progress} />}
      <canvas className="cornerstone-canvas" />
      {children}
    </div>
  )
})

const ViewerWrapper = React.memo(Forwarded)
// for eslintr(eact/display-name)
Forwarded.displayName = 'Forwarded'
ViewerWrapper.displayName = 'ViewerWrapper'

export default ViewerWrapper
