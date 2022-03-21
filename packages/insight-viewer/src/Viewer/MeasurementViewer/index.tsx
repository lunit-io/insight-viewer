import React, { useRef } from 'react'

import { svgStyle } from './MeasurementViewer.styles'
import { MeasurementsDrawProps, MeasurementViewerProps } from './MeasurementViewer.types'
import { useOverlayContext } from '../../contexts'
import { RulerViewer } from '../RulerViewer'

function MeasurementsDraw({
  mode,
  measurements,
  showOutline,
  showMeasurementLabel,
  selectedMeasurement,
  measurementAttrs,
  pixelToCanvas,
  onFocus,
  onRemove,
}: MeasurementsDrawProps) {
  return measurements.map(measurement => {
    const viewerProps = {
      showOutline,
      selectedMeasurement,
      showMeasurementLabel,
      measurementAttrs,
      pixelToCanvas,
    }

    const handleAnnotationClick = () => {
      if (!onRemove) return
      onRemove(measurement)
    }

    const handleAnnotationFocus = () => {
      if (!onFocus) return
      onFocus(measurement)
    }

    const handleAnnotationFocusOut = () => {
      if (!onFocus) return
      onFocus(null)
    }

    if (measurement.type !== mode) return null

    return (
      <g
        key={measurement.id}
        onClick={handleAnnotationClick}
        onMouseOver={handleAnnotationFocus}
        onMouseLeave={handleAnnotationFocusOut}
      >
        {measurement.type === 'ruler' && <RulerViewer measurement={measurement} {...viewerProps} />}
      </g>
    )
  })
}

export function MeasurementViewer({
  style,
  width,
  height,
  measurements,
  className,
  selectedMeasurement,
  mode = 'ruler',
  showOutline = false,
  showMeasurementLabel = false,
  measurementAttrs,
  onFocus,
  onRemove,
}: MeasurementViewerProps): JSX.Element {
  const svgRef = useRef<SVGSVGElement>(null)
  const { pixelToCanvas, enabledElement } = useOverlayContext()

  return (
    <svg ref={svgRef} width={width} height={height} style={{ ...svgStyle.default, ...style }} className={className}>
      {measurements.length === 0 || !enabledElement
        ? null
        : MeasurementsDraw({
            mode,
            measurements,
            selectedMeasurement,
            showOutline,
            showMeasurementLabel,
            pixelToCanvas,
            measurementAttrs,
            onFocus,
            onRemove,
          })}
    </svg>
  )
}
