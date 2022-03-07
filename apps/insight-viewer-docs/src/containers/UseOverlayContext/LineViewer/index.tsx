/* eslint-disable import/no-unresolved */
import React from 'react'
import { Box } from '@chakra-ui/react'
import { Resizable } from 're-resizable'
import InsightViewer, { useImage, useViewport, AnnotationOverlay } from '@lunit/insight-viewer'
import { IMAGES } from '../../../const'
import { initialAnnotation } from '../../../../mocks/lines'

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
} as const

/** Mock svg Size */
const DEFAULT_SIZE = { width: 700, height: 700 }

function LineContainer(): JSX.Element {
  const { loadingState, image } = useImage({
    wadouri: IMAGES[12],
  })
  const { viewport, setViewport } = useViewport()

  return (
    <Box data-cy-loaded={loadingState}>
      <Resizable style={style} defaultSize={DEFAULT_SIZE}>
        <InsightViewer image={image} viewport={viewport} onViewportChange={setViewport}>
          {loadingState === 'success' && (
            <AnnotationOverlay
              width={700}
              height={700}
              annotations={initialAnnotation}
              focusedAnnotation={null}
              mode="line"
            />
          )}
        </InsightViewer>
      </Resizable>
    </Box>
  )
}

export default LineContainer
