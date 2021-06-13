import React, { useCallback, useRef } from 'react'
import ViewerWrapper from '../components/ViewerWrapper'
import { WithChildren } from '../types'
import useImageLoader from '../hooks/useImageLoader'
import { enable, disable, setWadoImageLoader } from '../utils/cornerstoneHelper'
import { VIEWER_TYPE } from '../const'

export function DICOMImageViewer({
  imageId,
  single = true,
  children,
}: WithChildren<{ imageId: string; single?: boolean }>): JSX.Element {
  const enabledElementRef = useRef<HTMLDivElement | null>(null)
  const viewerRefCallback = useCallback((node: HTMLDivElement | null) => {
    if (node !== null) {
      enabledElementRef.current = node
      enable(enabledElementRef.current)
    } else if (enabledElementRef.current !== null) {
      disable(enabledElementRef.current)
    }
  }, [])
  useImageLoader({
    imageId,
    element: enabledElementRef.current,
    setLoader: () => setWadoImageLoader(() => {}),
    isSingleImage: single,
  })

  return (
    <ViewerWrapper ref={viewerRefCallback} type={VIEWER_TYPE.DICOM}>
      <canvas className="cornerstone-canvas" />
      {children}
    </ViewerWrapper>
  )
}
