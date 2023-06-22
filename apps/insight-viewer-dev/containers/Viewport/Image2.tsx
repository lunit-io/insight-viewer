import { useRef, useEffect, useCallback } from 'react'
import { Box, Stack, Button } from '@chakra-ui/react'
import InsightViewer, { useImage } from '@lunit/insight-viewer'
import { useViewport } from '@lunit/insight-viewer/viewport'
import { IMAGES } from '@insight-viewer-library/fixtures'
import { ViewerWrapper } from '../../components/Wrapper'
import CustomProgress from '../../components/CustomProgress'
import OverlayLayer from '../../components/OverlayLayer'
import { INITIAL_VIEWPORT2 } from './const'

import type { Viewport } from '@lunit/insight-viewer/viewport'

export default function Image2(): JSX.Element {
  const viewerRef = useRef<HTMLDivElement>(null)

  const { image } = useImage({
    wadouri: IMAGES[11],
  })
  const { viewport, setViewport, resetViewport } = useViewport({
    image,
    viewerRef,
    options: { fitScale: false },
    getInitialViewport: (prevViewport) => ({ ...prevViewport, ...INITIAL_VIEWPORT2 }),
  })
  const updateViewport = useCallback(
    (key: keyof Viewport, value: unknown) => {
      setViewport((prev: Viewport) => ({
        ...prev,
        [key]: value,
      }))
    },
    [setViewport]
  )

  useEffect(() => {
    function handleKeyDown({ code }: KeyboardEvent) {
      if (code === 'KeyS') {
        updateViewport('y', viewport.y + 10)
      }
      if (code === 'KeyW') {
        updateViewport('y', viewport.y - 10)
      }
      if (code === 'KeyD') {
        updateViewport('x', viewport.x + 10)
      }
      if (code === 'KeyA') {
        updateViewport('x', viewport.x - 10)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [setViewport, viewport, updateViewport])

  return (
    <Box>
      <Stack align="flex-start" spacing="20px">
        <Box mb={6} mt={120}>
          <Stack spacing="24px" direction="row">
            <Box>
              <Box>x transition {viewport?.x}</Box>
              <Box>
                <input
                  type="range"
                  id="x"
                  name="x"
                  min="0"
                  max="100"
                  step="10"
                  onChange={(e) => {
                    setViewport((prev) => ({
                      ...prev,
                      x: Number(e.target.value),
                    }))
                  }}
                  className="x-control2"
                  value={viewport?.x ?? 0}
                />
              </Box>
            </Box>
            <Box>
              <Box>y transition {viewport?.y}</Box>
              <Box>
                <input
                  type="range"
                  id="y"
                  name="y"
                  min="0"
                  max="100"
                  step="10"
                  onChange={(e) => {
                    setViewport((prev) => ({
                      ...prev,
                      y: Number(e.target.value),
                    }))
                  }}
                  className="y-control2"
                  value={viewport?.y ?? 0}
                />
              </Box>
            </Box>
            <Button colorScheme="blue" onClick={resetViewport} className="reset2">
              Reset
            </Button>
          </Stack>
        </Box>
      </Stack>
      <Box>
        <ViewerWrapper className="viewer2">
          <InsightViewer
            viewerRef={viewerRef}
            image={image}
            viewport={viewport}
            onViewportChange={setViewport}
            Progress={CustomProgress}
          >
            <OverlayLayer viewport={viewport} />
          </InsightViewer>
        </ViewerWrapper>
      </Box>
    </Box>
  )
}
