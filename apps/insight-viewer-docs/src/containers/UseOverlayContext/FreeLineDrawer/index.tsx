/* eslint-disable import/no-unresolved */
import React from 'react'
import { Box, Button } from '@chakra-ui/react'
import { Resizable } from 're-resizable'
import InsightViewer, { Contour, useImage, useAnnotation, useViewport, Annotation } from '@lunit/insight-viewer'
import { IMAGES } from '../../../const'
import { getPolygonStyles } from '../../../utils/common/getPolygonStyles'

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
} as const

/** Mock svg Size */
const DEFAULT_SIZE = { width: 700, height: 700 }

function FreeLineDrawerContainer(): JSX.Element {
  const { loadingState, image } = useImage({
    wadouri: IMAGES[12],
  })
  const { viewport, setViewport } = useViewport()
  const { annotations, focusedAnnotation, addAnnotation, removeAnnotation, focusAnnotation, removeAllAnnotation } =
    useAnnotation<Contour>({ mode: 'freeLine' })

  return (
    <>
      <Button data-cy-name="remove-button" marginBottom="10px" colorScheme="blue" onClick={removeAllAnnotation}>
        remove all
      </Button>
      <Box data-cy-loaded={loadingState}>
        <Resizable style={style} defaultSize={DEFAULT_SIZE}>
          <InsightViewer image={image} viewport={viewport} onViewportChange={setViewport}>
            {loadingState === 'success' && (
              <Annotation
                isDrawing
                mode="freeLine"
                showAnnotationLabel
                width={DEFAULT_SIZE.width}
                height={DEFAULT_SIZE.height}
                annotations={annotations}
                focusedAnnotation={focusedAnnotation}
                annotationAttrs={getPolygonStyles}
                onAdd={addAnnotation}
                onFocus={focusAnnotation}
                onRemove={removeAnnotation}
              />
            )}
          </InsightViewer>
        </Resizable>
      </Box>
    </>
  )
}

export default FreeLineDrawerContainer
