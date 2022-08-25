import { useEffect, useCallback } from 'react'
import { Box, Stack, Button } from '@chakra-ui/react'
import InsightViewer, { useImage, useViewport, Viewport } from '@lunit/insight-viewer'
import { ViewerWrapper } from '../../components/Wrapper'
import CustomProgress from '../../components/CustomProgress'
import OverlayLayer from '../../components/OverlayLayer'
import { INITIAL_VIEWPORT2 } from './const'
import { IMAGES } from '../../const'

export default function Image1(): JSX.Element {
  const { image } = useImage({
    wadouri: IMAGES[11],
  })
  const { viewport, setViewport, resetViewport } = useViewport(INITIAL_VIEWPORT2)

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
          <InsightViewer image={image} viewport={viewport} onViewportChange={setViewport} Progress={CustomProgress}>
            <OverlayLayer viewport={viewport} />
          </InsightViewer>
        </ViewerWrapper>
      </Box>
    </Box>
  )
}
