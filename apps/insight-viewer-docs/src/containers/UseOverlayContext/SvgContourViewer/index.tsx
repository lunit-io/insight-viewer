/* eslint-disable import/no-unresolved */
import React from 'react'
import { Box } from '@chakra-ui/react'
import { Resizable } from 're-resizable'
import InsightViewer, {
  Contour,
  useImage,
  useContour,
  useViewport,
  SvgContourViewer,
} from '@lunit/insight-viewer'
import { IMAGES } from '../../../const'
import mockContours from '../Contour/contours'
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

function SvgContourContainer(): JSX.Element {
  const { loadingState, image } = useImage({
    wadouri: IMAGES[12],
  })
  const { viewport, setViewport } = useViewport()
  const { contours, focusedContour } = useContour<Contour>({
    mode: 'contour',
    initalContours: mockContours,
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
              <SvgContourViewer
                focusedContour={focusedContour}
                width={DEFAULT_SIZE.width}
                height={DEFAULT_SIZE.height}
                contours={contours}
                polygonAttrs={getPolygonStyles}
                showPolygonLabel
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

export default SvgContourContainer
