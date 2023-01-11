import React, { useRef } from 'react'

import { svgRootStyle } from '../Viewer.styles'
import { useOverlayContext } from '../../contexts'
import { RulerViewer } from '../RulerViewer'
import { CircleViewer } from '../CircleViewer'

import type { MeasurementsDrawProps, MeasurementViewerProps } from './MeasurementViewer.types'

const measurementStyle: React.CSSProperties = {
  pointerEvents: 'auto',
}
function MeasurementsDraw({
  measurements,
  showOutline,
  hoveredMeasurement,
  measurementAttrs,
  onFocus,
  onClick,
}: MeasurementsDrawProps) {
  return measurements.map((measurement) => {
    const viewerProps = {
      showOutline,
      hoveredMeasurement,
      measurementAttrs,
    }

    const handleMeasurementClick = () => {
      if (!onClick) return

      if (onFocus) {
        onFocus(null)
      }

      onClick(measurement)
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
        {measurement.type === 'area' && <CircleViewer measurement={measurement} {...viewerProps} />}
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
  selectedMeasurement,
  isEditing = false,
  showOutline = false,
  measurementAttrs,
  onFocus,
  onClick,
}: MeasurementViewerProps): JSX.Element {
  const svgRef = useRef<SVGSVGElement>(null)
  const { enabledElement } = useOverlayContext()

  const measurementsOfViewer = selectedMeasurement
    ? measurements.filter((measurement) => measurement.id !== selectedMeasurement.id)
    : measurements

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      style={{ ...svgRootStyle.default, pointerEvents: 'none', ...style }}
      className={className}
    >
      {measurements.length === 0 || !enabledElement
        ? null
        : MeasurementsDraw({
            isEditing,
            measurements: measurementsOfViewer,
            hoveredMeasurement,
            showOutline,
            measurementAttrs,
            onFocus,
            onClick,
          })}
    </svg>
  )
}
