/* eslint-disable import/no-unresolved */
import React from 'react'
import { Box, Button } from '@chakra-ui/react'
import { Resizable } from 're-resizable'
import InsightViewer, {
  Contour,
  useImage,
  useContour,
  useViewport,
  SvgContourDrawer,
  SvgContourViewer,
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

function SvgContourContainer(): JSX.Element {
  const { loadingState, image } = useImage({
    wadouri: IMAGES[12],
  })
  const { viewport, setViewport } = useViewport()
  const {
    contours,
    focusedContour,
    addContour,
    removeContour,
    focusContour,
    removeAllContours,
  } = useContour<Contour>({ mode: 'contour' })

  return (
    <>
      <Button
        data-cy-name="remove-button"
        marginBottom="10px"
        colorScheme="blue"
        onClick={removeAllContours}
      >
        remove all
      </Button>
      <Box data-cy-loaded={loadingState}>
        <Resizable style={style} defaultSize={DEFAULT_SIZE}>
          <InsightViewer
            image={image}
            viewport={viewport}
            onViewportChange={setViewport}
          >
            {loadingState === 'success' && (
              <>
                <SvgContourViewer
                  focusedContour={focusedContour}
                  width={DEFAULT_SIZE.width}
                  height={DEFAULT_SIZE.height}
                  contours={contours}
                  polygonAttrs={getPolygonStyles}
                  showPolygonLabel
                />
                <SvgContourDrawer
                  width={DEFAULT_SIZE.width}
                  height={DEFAULT_SIZE.height}
                  contours={contours}
                  onAdd={addContour}
                  onFocus={focusContour}
                  onRemove={removeContour}
                />
              </>
            )}
          </InsightViewer>
        </Resizable>
      </Box>
    </>
  )
}

export default SvgContourContainer
