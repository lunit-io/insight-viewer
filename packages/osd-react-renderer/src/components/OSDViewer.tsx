import React, { useLayoutEffect, useRef } from 'react'
import ReactOSDDOM from '../ReactOSDDOM'
import { OSDViewerProps, OSDViewerRef } from '../types'

const OSDViewer = React.forwardRef<OSDViewerRef, OSDViewerProps>(
  ({ children, options = {} }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
      if (!(containerRef.current instanceof HTMLElement)) {
        return
      }
      const viewer = ReactOSDDOM.render(
        <>{children}</>,
        containerRef.current,
        options
      )
      const refValue = { container: containerRef.current, viewer }
      if (ref != null) {
        if (typeof ref === 'function') {
          ref(refValue)
        } else if (typeof ref === 'object') {
          ref.current = refValue
        }
      }
    }, [children, options])

    return (
      <div
        style={{ width: '100%', height: '100%' }}
        className="openseadragon"
        ref={containerRef}
      />
    )
  }
)

OSDViewer.displayName = 'OSDViewer'

export default OSDViewer
