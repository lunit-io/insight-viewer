import React, { forwardRef } from 'react'
import { WithChildren, ProgressComponent } from '../../types'
import LoadingProgress from '../LoadingProgress'
import Wrapper from './Wrapper'
import useResize from './useResize'

const Forwarded = forwardRef<
  HTMLDivElement,
  WithChildren<{ Progress?: ProgressComponent }>
>(({ Progress, children }, ref) => {
  const { resizeRef } = useResize(ref)

  return (
    <Wrapper ref={resizeRef}>
      {Progress && <LoadingProgress Progress={Progress} />}
      <canvas className="cornerstone-canvas" />
      {children}
    </Wrapper>
  )
})

const ViewerWrapper = React.memo(Forwarded)
// for eslintr(eact/display-name)
Forwarded.displayName = 'Forwarded'
ViewerWrapper.displayName = 'ViewerWrapper'

export default ViewerWrapper
