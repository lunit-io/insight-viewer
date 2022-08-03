import { SVGProps } from 'react'
import { Measurement, MeasurementMode } from 'types'

export interface MeasurementDrawerProps extends SVGProps<SVGSVGElement> {
  selectedMeasurement: Measurement | null
  measurements: Measurement[]

  isEditing?: boolean

  /** When drawing is complete and a new annotation occurs */
  onAdd: (annotation: Measurement) => void

  onSelectMeasurement: (measurement: Measurement | null) => void

  /**
   * Access Device Settings
   * Only the function for mouse is implemented, and it is not applied
   */
  device?: 'all' | 'mouse-only' | 'touch-only' | 'stylus-only' | 'mouse-and-stylus'

  mode?: MeasurementMode
}
