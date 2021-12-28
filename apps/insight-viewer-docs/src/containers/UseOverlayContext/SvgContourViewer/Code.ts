export const CODE = `\
import React from 'react'
import polylabel from 'polylabel'
import InsightViewer, { Point, Contour, SvgContourViewer, useViewport } from '@lunit/insight-viewer'

const style = {
  width: '500px',
  height: '500px'
}

/** Mock svg Size */
const DEFAULT_SIZE = { width: 500, height: 500 }

/** Mock contour list */
const mockContourList = [
  [
    [1901, 1835],
    [1900, 1836],
    [1898, 1836],
    [1897, 1837],
    [1896, 1837],
    ....
  ],
  [
    ....
]

/**
 * This function return mock Contour Data
 *
 * The labeling property is [number, number].
 *
 * If you want to place the label in the center of each polygon
 * Please refer to using the polylabel library below.
 *
 * Otherwise, you just have to enter the position you want.
*/
const getSvgContours = (contourList: Contours): Contour[] =>
  contourList.map((points, index) => ({
    polygon: points,
    id: index,
    lineWidth: 1,
    labelPosition: polylabel([points], 1) as Point
  }))

export default function App() {
  const { loadingState, image } = useImage({
    web: IMAGE_ID,
  })
  const { viewport, setViewport } = useViewport()

  const mockContours = getSvgContours(mockContourList)

  return (
    <div style={style}> // Wrapper size is required because InsightViewer's width/height is '100%'.
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
            contours={mockContours}
            showPolygonLabel // If this prop is not used, the polygon label will not be visible.
          />
        )}
      </InsightViewer>
    </div>
  )
}
`
