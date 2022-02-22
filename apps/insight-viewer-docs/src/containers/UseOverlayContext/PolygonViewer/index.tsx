/* eslint-disable import/no-unresolved */
import React from 'react'
import { Box } from '@chakra-ui/react'
import { Resizable } from 're-resizable'
import InsightViewer, {
  Contour,
  useImage,
  useContour,
  useViewport,
  Annotation,
} from '@lunit/insight-viewer'
import { IMAGES } from '../../../const'
import { CONTOURS } from '../../../../mocks/contours'
import { getPolygonStyles } from '../../../utils/common/getPolygonStyles'
import CodeBlock from '../../../components/CodeBlock'
import { CODE } from './Code'

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
} as const

/** Mock svg Size */
const DEFAULT_SIZE = { width: 500, height: 500 }

function PolygonContainer(): JSX.Element {
  const { loadingState, image } = useImage({
    wadouri: IMAGES[12],
  })
  const { viewport, setViewport } = useViewport()
  const { contours, focusedContour } = useContour<Contour>({
    mode: 'polygon',
    initalContours: CONTOURS,
  })

  return (
    <>
      <Box data-cy-loaded={loadingState}>
        <Resizable style={style} defaultSize={DEFAULT_SIZE}>
          <InsightViewer
            image={image}
            viewport={viewport}
            onViewportChange={setViewport}
          >
            {loadingState === 'success' && (
              <Annotation
                focusedContour={focusedContour}
                width={DEFAULT_SIZE.width}
                height={DEFAULT_SIZE.height}
                contours={contours}
                polygonAttrs={getPolygonStyles}
                showPolygonLabel
                mode="polygon" // If no mode is defined, the default value is polygon.
              />
            )}
          </InsightViewer>
        </Resizable>
      </Box>
      <Box>
        <CodeBlock code={CODE} />
      </Box>
    </>
  )
}

export default PolygonContainer
