/* eslint-disable import/no-unresolved */
import React, { useState } from 'react'
import { Box, Button, Radio, RadioGroup, Stack } from '@chakra-ui/react'
import { Resizable } from 're-resizable'
import InsightViewer, {
  AnnotationOverlay,
  useImage,
  useAnnotation,
  useViewport,
  LineHeadMode,
} from '@lunit/insight-viewer'
import { IMAGES } from '../../../const'
import { getPolygonStyles } from '../../../utils/common/getPolygonStyles'

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
} as const

/** Mock svg Size */
const DEFAULT_SIZE = { width: 700, height: 700 }
const MODE = 'line'

function LineDrawerContainer(): JSX.Element {
  const [headMode, setHeadMode] = useState<LineHeadMode>('normal')
  const { loadingState, image } = useImage({
    wadouri: IMAGES[12],
  })
  const { viewport, setViewport } = useViewport()
  const { annotations, selectedAnnotation, addAnnotation, removeAnnotation, selectAnnotation, removeAllAnnotation } =
    useAnnotation({ mode: MODE })

  const handleClickHeadModeRadio = (mode: LineHeadMode) => {
    setHeadMode(mode)
  }

  return (
    <>
      <Button data-cy-name="remove-button" marginBottom="10px" colorScheme="blue" onClick={removeAllAnnotation}>
        remove all
      </Button>
      <RadioGroup onChange={handleClickHeadModeRadio} value={headMode}>
        <Stack direction="row">
          <p style={{ marginRight: '10px' }}>Select Head mode</p>
          <Radio value="normal">normal</Radio>
          <Radio value="arrow">arrow</Radio>
        </Stack>
      </RadioGroup>
      <Box data-cy-loaded={loadingState}>
        <Resizable style={style} defaultSize={DEFAULT_SIZE}>
          <InsightViewer image={image} viewport={viewport} onViewportChange={setViewport}>
            {loadingState === 'success' && (
              <AnnotationOverlay
                isDrawing
                lineHead={headMode}
                mode={MODE}
                showAnnotationLabel={false}
                width={DEFAULT_SIZE.width}
                height={DEFAULT_SIZE.height}
                annotations={annotations}
                selectedAnnotation={selectedAnnotation}
                annotationAttrs={getPolygonStyles}
                onAdd={addAnnotation}
                onFocus={selectAnnotation}
                onRemove={removeAnnotation}
              />
            )}
          </InsightViewer>
        </Resizable>
      </Box>
    </>
  )
}

export default LineDrawerContainer
