import { useRef, useEffect, useCallback } from 'react'
import { Box, Stack, Switch, Button } from '@chakra-ui/react'
import InsightViewer, { useImage } from '@lunit/insight-viewer'
import { useViewport } from '@lunit/insight-viewer/viewport'

import { IMAGES } from '@insight-viewer-library/fixtures'
import { ViewerWrapper } from '../../components/Wrapper'
import CustomProgress from '../../components/CustomProgress'
import OverlayLayer from '../../components/OverlayLayer'
import { INITIAL_VIEWPORT1 } from './const'

import type { Viewport } from '@lunit/insight-viewer/viewport'

export default function Image1(): JSX.Element {
  const viewerRef = useRef<HTMLDivElement>(null)

  const { loadingState, image } = useImage({
    wadouri: IMAGES[0],
  })
  const { viewport, setViewport, resetViewport, initialized } = useViewport({
    image,
    viewerRef,
    options: { fitScale: false },
    getInitialViewport: (prevViewport) => ({ ...prevViewport, ...INITIAL_VIEWPORT1 }),
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
        <Box mb={6}>
          <Stack spacing="24px" mt={3} direction="row">
            <Box>
              <Box>x transition {viewport.x}</Box>
              <Box>
                <input
                  type="range"
                  id="x"
                  name="x"
                  min="0"
                  max="100"
                  step="10"
                  onChange={(e) => {
                    updateViewport('x', Number(e.target.value))
                  }}
                  className="x-control"
                  value={viewport?.x ?? 0}
                />
              </Box>
            </Box>
            <Box>
              <Box>y transition {viewport.y}</Box>
              <Box>
                <input
                  type="range"
                  id="y"
                  name="y"
                  min="0"
                  max="100"
                  step="10"
                  onChange={(e) => {
                    updateViewport('y', Number(e.target.value))
                  }}
                  className="y-control"
                  value={viewport?.y ?? 0}
                />
              </Box>
            </Box>
            <Button colorScheme="blue" onClick={resetViewport} className="reset">
              Reset
            </Button>
          </Stack>

          <Stack spacing="24px" mt={3} direction="row">
            <Box>
              <Box>windowWidth {viewport.windowWidth}</Box>
              <Box>
                <input
                  type="range"
                  id="windowWidth"
                  name="windowWidth"
                  min="0"
                  max="300"
                  step="10"
                  onChange={(e) => {
                    updateViewport('windowWidth', Number(e.target.value))
                  }}
                  className="window-width-control"
                  value={viewport?.windowWidth ?? 0}
                />
              </Box>
            </Box>
            <Box>
              <Box>windowCenter {viewport.windowCenter}</Box>
              <Box>
                <input
                  type="range"
                  id="windowCenter"
                  name="windowCenter"
                  min="0"
                  max="300"
                  step="10"
                  onChange={(e) => {
                    updateViewport('windowCenter', Number(e.target.value))
                  }}
                  className="window-center-control"
                  value={viewport?.windowCenter ?? 0}
                />
              </Box>
            </Box>
          </Stack>
          <Stack spacing="24px" mt={3} direction="row">
            <Box>
              <Box>scale {viewport.scale}</Box>
              <Box>
                <input
                  type="range"
                  id="scale"
                  name="scale"
                  min="0.5"
                  max="2"
                  step="0.1"
                  onChange={(e) => {
                    updateViewport('scale', Number(e.target.value))
                  }}
                  className="scale-control"
                  value={viewport?.scale ?? 0}
                />
              </Box>
            </Box>
            <Box>
              <Box>rotation {viewport.rotation}</Box>
              <Box>
                <input
                  type="range"
                  id="rotation"
                  name="rotation"
                  min="0"
                  max="360"
                  step="5"
                  onChange={(e) => {
                    updateViewport('rotation', Number(e.target.value))
                  }}
                  className="rotation-control"
                  value={viewport?.rotation ?? 0}
                />
              </Box>
            </Box>
          </Stack>
          <Stack spacing="24px" direction="row" mt={6}>
            <Box>
              invert{' '}
              <Switch
                onChange={(e) => updateViewport('invert', e.target.checked)}
                className="invert-control"
                isChecked={viewport.invert}
              />
            </Box>
            <Box>
              hflip{' '}
              <Switch
                onChange={(e) => updateViewport('hflip', e.target.checked)}
                className="hflip-control"
                isChecked={viewport?.hflip ?? false}
              />
            </Box>
            <Box>
              vflip{' '}
              <Switch
                onChange={(e) => updateViewport('vflip', e.target.checked)}
                className="vflip-control"
                isChecked={viewport?.vflip ?? false}
              />
            </Box>
          </Stack>
        </Box>
      </Stack>
      <Box data-cy-loaded={loadingState} data-cy-viewport={initialized}>
        <ViewerWrapper className="viewer1">
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
