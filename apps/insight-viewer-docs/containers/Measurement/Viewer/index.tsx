import { useRef, useState } from 'react'
import { Box, Radio, RadioGroup, Stack } from '@chakra-ui/react'
import { Resizable } from 're-resizable'
import InsightViewer, {
  useMeasurement,
  useImage,
  MeasurementOverlay,
  MeasurementMode,
  Measurement,
} from '@lunit/insight-viewer'
import { useViewport } from '@lunit/insight-viewer/viewport'
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
  const viewerRef = useRef<HTMLDivElement>(null)

  const [measurementMode, setMeasurementMode] = useState<MeasurementMode>('ruler')

  const { loadingState, image } = useImage({
    wadouri: IMAGES[11],
  })

  const { viewport, setViewport } = useViewport({
    image,
    element: viewerRef.current,
  })
  const { measurements, hoveredMeasurement, selectedMeasurement, selectMeasurement } = useMeasurement({
    initialMeasurement: INITIAL_MEASUREMENTS[measurementMode],
  })

  const handleMeasurementModeChange = (mode: MeasurementMode) => {
    setMeasurementMode(mode)
  }

  return (
    <Box data-cy-loaded={loadingState}>
      <RadioGroup onChange={handleMeasurementModeChange} value={measurementMode}>
        <Stack direction="row">
          <p style={{ marginRight: '10px' }}>Select Head mode</p>
          <Radio value="ruler">Ruler</Radio>
          <Radio value="circle">Circle</Radio>
        </Stack>
      </RadioGroup>
      <Resizable style={style} defaultSize={DEFAULT_SIZE} className={`measurement ${measurementMode}`}>
        <InsightViewer viewerRef={viewerRef} image={image} viewport={viewport} onViewportChange={setViewport}>
          {loadingState === 'success' && (
            <MeasurementOverlay
              width={700}
              height={700}
              measurements={measurements}
              hoveredMeasurement={hoveredMeasurement}
              selectedMeasurement={selectedMeasurement}
              mode={measurementMode}
              onSelect={selectMeasurement}
            />
          )}
        </InsightViewer>
      </Resizable>
    </Box>
  )
}

export default MeasurementViewerContainer
