import React, { forwardRef, useEffect } from 'react'
import { WithChildren, ProgressComponent, OnViewportChange } from '../../types'
import { getViewport, formatViewerViewport } from '../../utils/cornerstoneHelper'
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
    imageEnabled: boolean
  }>
>(({ Progress, onViewportChange, imageEnabled, children }, ref) => {
  const { resizeRef, width, height } = useResize(ref)

  useEffect(() => {
    if (width === undefined || height === undefined) return
    if (!resizeRef.current || !imageEnabled) return
    // update Viewer's viewport prop to change
    if (onViewportChange) {
      const viewport = getViewport(resizeRef.current)
      onViewportChange(formatViewerViewport(viewport))
    }
  }, [width, height, resizeRef, imageEnabled, onViewportChange])

  return (
    /**
     * react 18 적용 및 react-resize-detector 버전을 올리면서
     * 기존 resizeRef 를 할당하는 방식은 무한 렌더링을 유발하여 ref 를 할당
     * TODO: resize 관련 이슈 대응 시, 추가 작업 필요
     */
    <div ref={ref} style={style} className="cornerstone-canvas-wrapper" data-cy="cornerstone-canvas-wrapper">
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
