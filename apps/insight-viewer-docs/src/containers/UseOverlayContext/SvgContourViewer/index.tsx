/* eslint-disable import/no-unresolved */
import React from 'react'
import polylabel from 'polylabel'
import { Box } from '@chakra-ui/react'
import { Resizable } from 're-resizable'
import InsightViewer, {
  Point,
  Contour,
  Contours,
  useImage,
  useViewport,
  SvgContourViewer,
} from '@lunit/insight-viewer'
import { IMAGES } from '../../../const'
import contours from '../Contour/contours'
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

/** This function return mock Contour Data */
const getSvgContours = (contourList: Contours): Contour[] =>
  contourList.map((points, index) => ({
    polygon: points,
    id: index,
    lineWidth: 1,
    labelPosition: polylabel([points], 1) as Point,
  }))

function SvgContourContainer(): JSX.Element {
  const { loadingState, image } = useImage({
    wadouri: IMAGES[12],
  })
  const { viewport, setViewport } = useViewport()
  const svgContours = getSvgContours(contours)

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
                focusedContour={null}
                width={DEFAULT_SIZE.width}
                height={DEFAULT_SIZE.height}
                contours={svgContours}
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
