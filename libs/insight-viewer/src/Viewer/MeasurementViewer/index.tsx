import React, { useRef } from 'react'

import { svgRootStyle } from '../Viewer.styles'
import { MeasurementsDrawProps, MeasurementViewerProps } from './MeasurementViewer.types'
import { useOverlayContext } from '../../contexts'
import { RulerViewer } from '../RulerViewer'
import { CircleViewer } from '../CircleViewer'

const measurementStyle: React.CSSProperties = {
  pointerEvents: 'auto',
}
function MeasurementsDraw({
  isEditing,
  measurements,
  showOutline,
  hoveredMeasurement,
  measurementAttrs,
  onFocus,
  onRemove,
  onSelect,
}: MeasurementsDrawProps) {
  return measurements.map((measurement) => {
    const viewerProps = {
      showOutline,
      hoveredMeasurement,
      measurementAttrs,
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
        data-cy-id={measurement.id}
        onClick={handleMeasurementClick}
        onMouseOver={handleMeasurementFocus}
        onMouseLeave={handleMeasurementFocusOut}
        style={measurementStyle}
      >
        {measurement.type === 'ruler' && <RulerViewer measurement={measurement} {...viewerProps} />}
        {measurement.type === 'circle' && <CircleViewer measurement={measurement} {...viewerProps} />}
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
  const { enabledElement } = useOverlayContext()

  return (
    <svg ref={svgRef} width={width} height={height} style={{ ...svgRootStyle.default, ...style }} className={className}>
      {measurements.length === 0 || !enabledElement
        ? null
        : MeasurementsDraw({
            isEditing,
            measurements,
            hoveredMeasurement,
            showOutline,
            measurementAttrs,
            onFocus,
            onRemove,
            onSelect,
          })}
    </svg>
  )
}
