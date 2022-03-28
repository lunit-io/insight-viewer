import { SVGProps } from 'react'
import { Measurement, MeasurementMode } from '../../types'

export interface MeasurementDrawerProps extends SVGProps<SVGSVGElement> {
  measurements: Measurement[]

  /** When drawing is complete and a new annotation occurs */
  onAdd: (annotation: Measurement) => void

  /**
   * Access Device Settings
   * Only the function for mouse is implemented, and it is not applied
   */
  device?: 'all' | 'mouse-only' | 'touch-only' | 'stylus-only' | 'mouse-and-stylus'

  mode?: MeasurementMode
}
