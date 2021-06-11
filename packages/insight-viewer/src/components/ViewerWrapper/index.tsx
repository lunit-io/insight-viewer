import React, { forwardRef } from 'react'
import { WithChildren, ViewerType, Element } from '../../types'
import LoadingProgress from '../LoadingProgress'
import Wrapper from './Wrapper'
import { VIEWER_TYPE } from '../../const'
import useResize from './useResize'
import { ViewportContextProvider } from '../../Context/Viewport'

const Forwarded = forwardRef<
  HTMLDivElement,
  WithChildren<{ type: ViewerType }>
>(({ type, children }, ref) => {
  const { resizeRef } = useResize(ref)

  return (
    <Wrapper ref={resizeRef}>
      {type === VIEWER_TYPE.DICOM && <LoadingProgress />}
      <canvas className="cornerstone-canvas" />
      <ViewportContextProvider
        element={(ref as React.MutableRefObject<Element>).current}
      >
        {children}
      </ViewportContextProvider>
    </Wrapper>
  )
})

const ViewerWrapper = React.memo(Forwarded)
// for eslintr(eact/display-name)
Forwarded.displayName = 'Forwarded'
ViewerWrapper.displayName = 'ViewerWrapper'

export default ViewerWrapper
