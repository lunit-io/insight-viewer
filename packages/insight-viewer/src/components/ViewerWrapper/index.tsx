import React, { forwardRef } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { WithChildren, ViewerType } from '../../types'
import LoadingProgress from '../LoadingProgress'
import Wrapper from './Wrapper'
import { VIEWER_TYPE } from '../../const'
import useResize from './useResize'

const ViewerWrapper = forwardRef<
  HTMLDivElement,
  WithChildren<{
    type: ViewerType
  }>
>(({ type, children }, ref) => {
  const { resizeRef } = useResize(ref)

  return (
    <ChakraProvider>
      <Wrapper ref={resizeRef}>
        {type === VIEWER_TYPE.DICOM && <LoadingProgress />}
        <canvas className="cornerstone-canvas" />
        {children}
      </Wrapper>
    </ChakraProvider>
  )
})

ViewerWrapper.displayName = 'ViewerWrapper'
export default ViewerWrapper
