import { useRef, useState } from 'react'
import { Box, Radio, RadioGroup, Stack } from '@chakra-ui/react'
import { Resizable } from 're-resizable'
import InsightViewer, { useImage } from '@lunit/insight-viewer'
import { AnnotationOverlay, Annotation, AnnotationMode, useAnnotation } from '@lunit/insight-viewer/annotation'
import { useViewport } from '@lunit/insight-viewer/viewport'
import { IMAGES, RULER_MEASUREMENTS, AREA_MEASUREMENTS } from '@insight-viewer-library/fixtures'

export type InitialAnnotations = {
  [mode in AnnotationMode]?: Annotation[]
}

const INITIAL_ANNOTATIONS: InitialAnnotations = {
  ruler: RULER_MEASUREMENTS,
  area: AREA_MEASUREMENTS,
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

  const [annotationMode, setAnnotationMode] = useState<AnnotationMode>('ruler')

  const { loadingState, image } = useImage({
    wadouri: IMAGES[11],
  })

  const { viewport, setViewport } = useViewport({
    image,
    element: viewerRef.current,
  })
  const { annotations, hoveredAnnotation, selectedAnnotation, selectAnnotation } = useAnnotation({
    initialAnnotation: INITIAL_ANNOTATIONS[annotationMode],
  })

  const handleMeasurementModeChange = (mode: AnnotationMode) => {
    setAnnotationMode(mode)
  }

  return (
    <Box data-cy-loaded={loadingState}>
      <RadioGroup onChange={handleMeasurementModeChange} value={annotationMode}>
        <Stack direction="row">
          <p style={{ marginRight: '10px' }}>Select Head mode</p>
          <Radio value="ruler">Ruler</Radio>
          <Radio value="area">Area</Radio>
        </Stack>
      </RadioGroup>
      <Resizable style={style} defaultSize={DEFAULT_SIZE} className={`measurement ${annotationMode}`}>
        <InsightViewer viewerRef={viewerRef} image={image} viewport={viewport} onViewportChange={setViewport}>
          {loadingState === 'success' && (
            <AnnotationOverlay
              width={700}
              height={700}
              annotations={annotations}
              hoveredAnnotation={hoveredAnnotation}
              selectedAnnotation={selectedAnnotation}
              mode={annotationMode}
              onSelect={selectAnnotation}
            />
          )}
        </InsightViewer>
      </Resizable>
    </Box>
  )
}

export default MeasurementViewerContainer
