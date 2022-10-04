import { useState, ChangeEvent } from 'react'
import { Box, Switch, Radio, RadioGroup, Stack } from '@chakra-ui/react'
import { Resizable } from 're-resizable'
import InsightViewer, {
  useMeasurement,
  useImage,
  useViewport,
  MeasurementOverlay,
  MeasurementMode,
  Measurement,
} from '@lunit/insight-viewer'
import { IMAGES, RULER_MEASUREMENTS, CIRCLE_MEASUREMENTS } from '@insight-viewer-library/fixtures'

export type InitialMeasurements = {
  [mode in MeasurementMode]: Measurement[]
}

const INITIAL_MEASUREMENTS: InitialMeasurements = {
  ruler: RULER_MEASUREMENTS,
  circle: CIRCLE_MEASUREMENTS,
}

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
} as const

/** Mock svg Size */
const DEFAULT_SIZE = { width: 700, height: 700 }

function MeasurementViewerContainer(): JSX.Element {
  const [measurementMode, setMeasurementMode] = useState<MeasurementMode>('ruler')
  const [isRemove, setIsRemove] = useState(false)

  const { loadingState, image } = useImage({
    wadouri: IMAGES[11],
  })

  const { viewport, setViewport } = useViewport()
  const {
    measurements,
    hoveredMeasurement,
    selectedMeasurement,
    removeMeasurement,
    selectMeasurement,
    hoverMeasurement,
  } = useMeasurement({
    initialMeasurement: INITIAL_MEASUREMENTS[measurementMode],
  })

  const handleEditModeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsRemove(event.target.checked)
  }

  const handleMeasurementModeChange = (mode: MeasurementMode) => {
    setMeasurementMode(mode)
  }

  return (
    <Box data-cy-loaded={loadingState}>
      <Box>
        remove mode <Switch data-cy-remove-mode={isRemove} onChange={handleEditModeChange} isChecked={isRemove} />
      </Box>
      <RadioGroup onChange={handleMeasurementModeChange} value={measurementMode}>
        <Stack direction="row">
          <p style={{ marginRight: '10px' }}>Select Head mode</p>
          <Radio value="ruler">Ruler</Radio>
          <Radio value="circle">Circle</Radio>
        </Stack>
      </RadioGroup>
      <Resizable style={style} defaultSize={DEFAULT_SIZE}>
        <InsightViewer image={image} viewport={viewport} onViewportChange={setViewport}>
          {loadingState === 'success' && (
            <MeasurementOverlay
              width={700}
              height={700}
              measurements={measurements}
              hoveredMeasurement={hoveredMeasurement}
              selectedMeasurement={selectedMeasurement}
              mode={measurementMode}
              onSelect={selectMeasurement}
              onFocus={isRemove ? hoverMeasurement : undefined}
              onRemove={isRemove ? removeMeasurement : undefined}
            />
          )}
        </InsightViewer>
      </Resizable>
    </Box>
  )
}

export default MeasurementViewerContainer
