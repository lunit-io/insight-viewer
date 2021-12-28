/* eslint-disable import/no-unresolved */
import React from 'react'
import { Box } from '@chakra-ui/react'
import { Resizable } from 're-resizable'
import InsightViewer, {
  Contour,
  Contours,
  useImage,
  useViewport,
  SvgContourViewer,
} from '@lunit/insight-viewer'
import { IMAGES } from '../../../const'
import contours from '../Contour/contours'
import { getPolygonStyles } from '../../../utils/common/getPolygonStyles'

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
} as const

/** Mock svg Size */
const DEFAULT_SIZE = { width: 1000, height: 1000 }

/** This function return mock Contour Data */
const getSvgContours = (contourList: Contours): Contour[] =>
  contourList.map((points, index) => ({
    polygon: points,
    id: index,
    lineWidth: 1,
  }))

function SvgContourContainer(): JSX.Element {
  const { loadingState, image } = useImage({
    wadouri: IMAGES[12],
  })
  const { viewport, setViewport } = useViewport()
  const svgContours = getSvgContours(contours)

  return (
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
            />
          )}
        </InsightViewer>
      </Resizable>
    </Box>
  )
}

export default SvgContourContainer
