import React, { useRef } from 'react'

import { svgStyle } from './MeasurementViewer.styles'
import { MeasurementsDrawProps, MeasurementViewerProps } from './MeasurementViewer.types'
import { useOverlayContext } from '../../contexts'
import { RulerViewer } from '../RulerViewer'

function MeasurementsDraw({
  isEditing,
  measurements,
  showOutline,
  hoveredMeasurement,
  measurementAttrs,
  pixelToCanvas,
  onFocus,
  onRemove,
  onSelect,
}: MeasurementsDrawProps) {
  return measurements.map(measurement => {
    const viewerProps = {
      showOutline,
      hoveredMeasurement,
      measurementAttrs,
      pixelToCanvas,
    }

    const handleMeasurementClick = () => {
      if (isEditing && onSelect) {
        onSelect(measurement)
        return
      }

      if (!onRemove) return
      onRemove(measurement)
    }

    const handleMeasurementFocus = () => {
      if (!onFocus) return
      onFocus(measurement)
    }

    const handleMeasurementFocusOut = () => {
      if (!onFocus) return
      onFocus(null)
    }

    return (
      <g
        key={measurement.id}
        onClick={handleMeasurementClick}
        onMouseOver={handleMeasurementFocus}
        onMouseLeave={handleMeasurementFocusOut}
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
  hoveredMeasurement,
  isEditing = false,
  showOutline = false,
  measurementAttrs,
  onFocus,
  onRemove,
  onSelect,
}: MeasurementViewerProps): JSX.Element {
  const svgRef = useRef<SVGSVGElement>(null)
  const { pixelToCanvas, enabledElement } = useOverlayContext()

  return (
    <svg ref={svgRef} width={width} height={height} style={{ ...svgStyle.default, ...style }} className={className}>
      {measurements.length === 0 || !enabledElement
        ? null
        : MeasurementsDraw({
            isEditing,
            measurements,
            hoveredMeasurement,
            showOutline,
            pixelToCanvas,
            measurementAttrs,
            onFocus,
            onRemove,
            onSelect,
          })}
    </svg>
  )
}
