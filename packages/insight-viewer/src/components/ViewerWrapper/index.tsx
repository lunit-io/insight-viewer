import React, { forwardRef } from 'react'
import { WithChildren, Element, Progress as ProgressType } from '../../types'
import LoadingProgress from '../LoadingProgress'
import Wrapper from './Wrapper'
import useResize from './useResize'
import { ViewportContextProvider } from '../../Context/Viewport'

const ViewerWrapper = forwardRef<
  HTMLDivElement,
  WithChildren<{ Progress?: ProgressType }>
>(({ Progress, children }, ref) => {
  const { resizeRef } = useResize(ref)

  return (
    <Wrapper ref={resizeRef}>
      {Progress && <LoadingProgress Progress={Progress} />}
      <canvas className="cornerstone-canvas" />
      <ViewportContextProvider
        element={(ref as React.MutableRefObject<Element>).current}
      >
        {children}
      </ViewportContextProvider>
    </Wrapper>
  )
})

ViewerWrapper.displayName = 'ViewerWrapper'
export default ViewerWrapper
