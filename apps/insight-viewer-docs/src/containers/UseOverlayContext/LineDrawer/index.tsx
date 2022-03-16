/* eslint-disable import/no-unresolved */
import React, { useState } from 'react'
import { Box, Button } from '@chakra-ui/react'
import { Resizable } from 're-resizable'
import InsightViewer, {
  AnnotationOverlay,
  useImage,
  useAnnotation,
  useViewport,
  Annotation,
  HeadType,
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
  const { loadingState, image } = useImage({
    wadouri: IMAGES[12],
  })
  const { viewport, setViewport } = useViewport()
  const { annotations, selectedAnnotation, addAnnotation, removeAnnotation, selectAnnotation, removeAllAnnotation } =
    useAnnotation<Annotation>({ mode: MODE })
  const [head, setHead] = useState<HeadType>('normal')

  const handleHeadShape = () => {
    setHead(head === 'normal' ? 'arrow' : 'normal')
  }

  return (
    <>
      <Button data-cy-name="remove-button" marginBottom="10px" colorScheme="blue" onClick={removeAllAnnotation}>
        remove all
      </Button>
      <Button
        data-cy-name="head-mode"
        marginBottom="10px"
        marginLeft="10px"
        colorScheme="blue"
        onClick={handleHeadShape}
      >
        {head === 'normal' ? 'arrow' : 'normal'}
      </Button>
      <Box data-cy-loaded={loadingState}>
        <Resizable style={style} defaultSize={DEFAULT_SIZE}>
          <InsightViewer image={image} viewport={viewport} onViewportChange={setViewport}>
            {loadingState === 'success' && (
              <AnnotationOverlay
                isDrawing
                head={head}
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
