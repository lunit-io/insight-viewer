/* eslint-disable import/no-unresolved */
import React, { useState } from 'react'
import { Box, Radio, RadioGroup, Stack, Button } from '@chakra-ui/react'
import { Resizable } from 're-resizable'
import InsightViewer, {
  useAnnotation,
  useImage,
  useViewport,
  AnnotationOverlay,
  AnnotationMode,
} from '@lunit/insight-viewer'
import { IMAGES } from '../../../const'

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
} as const

/** Mock svg Size */
const DEFAULT_SIZE = { width: 700, height: 700 }

function AnnotationDrawerContainer(): JSX.Element {
  const [annotationMode, setAnnotationMode] = useState<AnnotationMode>('polygon')
  const { loadingState, image } = useImage({
    wadouri: IMAGES[12],
  })
  const { viewport, setViewport } = useViewport()
  const { annotations, hoveredAnnotation, addAnnotation, removeAnnotation, hoverAnnotation, removeAllAnnotation } =
    useAnnotation({ mode: annotationMode })

  const handleAnnotationModeClick = (mode: AnnotationMode) => {
    setAnnotationMode(mode)
  }

  return (
    <Box data-cy-loaded={loadingState}>
      <Button data-cy-name="remove-button" marginBottom="10px" colorScheme="blue" onClick={removeAllAnnotation}>
        remove all
      </Button>
      <RadioGroup onChange={handleAnnotationModeClick} value={annotationMode}>
        <Stack direction="row">
          <p style={{ marginRight: '10px' }}>Select Head mode</p>
          <Radio value="polygon">Polygon</Radio>
          <Radio value="line">line</Radio>
          <Radio value="freeLine">Free Line</Radio>
          <Radio value="text">Text</Radio>
          <Radio value="circle">Circle - Not implemented yet</Radio>
        </Stack>
      </RadioGroup>
      <Resizable style={style} defaultSize={DEFAULT_SIZE}>
        <InsightViewer image={image} viewport={viewport} onViewportChange={setViewport}>
          {loadingState === 'success' && (
            <AnnotationOverlay
              isDrawing
              width={700}
              height={700}
              mode={annotationMode}
              annotations={annotations}
              hoveredAnnotation={hoveredAnnotation}
              showAnnotationLabel
              onAdd={addAnnotation}
              onFocus={hoverAnnotation}
              onRemove={removeAnnotation}
            />
          )}
        </InsightViewer>
      </Resizable>
    </Box>
  )
}

export default AnnotationDrawerContainer
