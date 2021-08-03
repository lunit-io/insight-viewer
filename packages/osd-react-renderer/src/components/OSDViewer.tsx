import React, { useLayoutEffect, useRef } from 'react'
import ReactOSDDOM from '../ReactOSDDOM'
import { OSDViewerProps } from '../types'

const OSDViewer: React.FC<OSDViewerProps> = ({ children, options = {} }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!(containerRef.current instanceof HTMLElement)) {
      return
    }
    ReactOSDDOM.render(<>{children}</>, containerRef.current, options)
  })

  return (
    <div
      style={{ width: '100%', height: '100%' }}
      className="openseadragon"
      ref={containerRef}
    />
  )
}

OSDViewer.displayName = 'OSDViewer'

export default OSDViewer
