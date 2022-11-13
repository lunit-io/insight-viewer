import { SVGProps } from 'react'
import { Measurement, MeasurementMode } from '../../types'

export interface MeasurementDrawerProps extends SVGProps<SVGSVGElement> {
  selectedMeasurement: Measurement | null
  measurements: Measurement[]

  isDrawing?: boolean
  isEditing?: boolean

  /** When drawing is complete and a new annotation occurs */
  onAdd: (annotation: Measurement) => void

  onSelectMeasurement: (measurement: Measurement | null) => void
  hoveredMeasurement: Measurement | null
  mode?: MeasurementMode
}
