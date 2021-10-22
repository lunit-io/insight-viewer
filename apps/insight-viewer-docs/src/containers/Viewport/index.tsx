import { useEffect, useCallback } from 'react'
import { Box, Text, Stack, Switch, Button } from '@chakra-ui/react'
import InsightViewer, {
  useImage,
  useViewport,
  Viewport,
} from '@lunit/insight-viewer'
import CodeBlock from '../../components/CodeBlock'
import OverlayLayer from '../../components/OverlayLayer'
import CustomProgress from '../../components/CustomProgress'
import { ViewerWrapper } from '../../components/Wrapper'
import { CODE } from './Code'
import { INITIAL_VIEWPORT1, INITIAL_VIEWPORT2 } from './const'
import { IMAGES, CODE_SANDBOX } from '../../const'

export default function App(): JSX.Element {
  const { loadingState, image } = useImage({
    wadouri: IMAGES[10],
  })
  const { image: image2 } = useImage({
    wadouri: IMAGES[11],
  })
  const { viewport, setViewport, resetViewport, initialized } =
    useViewport(INITIAL_VIEWPORT1)
  const {
    viewport: viewport2,
    setViewport: setViewport2,
    resetViewport: resetViewport2,
  } = useViewport(INITIAL_VIEWPORT2)

  function handleFirstReset() {
    resetViewport()
  }

  function handleSecondReset() {
    resetViewport2()
  }

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
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 's') {
        updateViewport('y', viewport.y + 10)
      }
      if (e.key === 'w') {
        updateViewport('y', viewport.y - 10)
      }
      if (e.key === 'd') {
        updateViewport('x', viewport.x + 10)
      }
      if (e.key === 'a') {
        updateViewport('x', viewport.x - 10)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [setViewport, viewport, updateViewport])

  return (
    <>
      <Box data-cy-viewport={initialized}>
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
                    onChange={e => {
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
                    onChange={e => {
                      updateViewport('y', Number(e.target.value))
                    }}
                    className="y-control"
                    value={viewport?.y ?? 0}
                  />
                </Box>
              </Box>
              <Button
                colorScheme="blue"
                onClick={handleFirstReset}
                className="reset"
              >
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
                    onChange={e => {
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
                    onChange={e => {
                      updateViewport('windowCenter', Number(e.target.value))
                    }}
                    className="window-center-control"
                    value={viewport?.windowCenter ?? 0}
                  />
                </Box>
              </Box>
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
                    onChange={e => {
                      updateViewport('scale', Number(e.target.value))
                    }}
                    className="scale-control"
                    value={viewport?.scale ?? 0}
                  />
                </Box>
              </Box>
            </Stack>
            <Stack spacing="24px" direction="row" mt={6}>
              <Box>
                invert{' '}
                <Switch
                  onChange={e => updateViewport('invert', e.target.checked)}
                  className="invert-control"
                  isChecked={viewport.invert}
                />
              </Box>
              <Box>
                hflip{' '}
                <Switch
                  onChange={e => updateViewport('hflip', e.target.checked)}
                  className="hflip-control"
                  isChecked={viewport?.hflip ?? false}
                />
              </Box>
              <Box>
                vflip{' '}
                <Switch
                  onChange={e => updateViewport('vflip', e.target.checked)}
                  className="vflip-control"
                  isChecked={viewport?.vflip ?? false}
                />
              </Box>
            </Stack>
          </Box>
          <Box mb={6}>
            <Stack spacing="24px" direction="row">
              <Box>
                <Box>x transition {viewport2?.x}</Box>
                <Box>
                  <input
                    type="range"
                    id="x"
                    name="x"
                    min="0"
                    max="100"
                    step="10"
                    onChange={e => {
                      setViewport2(prev => ({
                        ...prev,
                        x: Number(e.target.value),
                      }))
                    }}
                    className="x-control2"
                    value={viewport2?.x ?? 0}
                  />
                </Box>
              </Box>
              <Box>
                <Box>y transition {viewport2?.y}</Box>
                <Box>
                  <input
                    type="range"
                    id="y"
                    name="y"
                    min="0"
                    max="100"
                    step="10"
                    onChange={e => {
                      setViewport2(prev => ({
                        ...prev,
                        y: Number(e.target.value),
                      }))
                    }}
                    className="y-control2"
                    value={viewport2?.y ?? 0}
                  />
                </Box>
              </Box>
              <Button
                colorScheme="blue"
                onClick={handleSecondReset}
                className="reset2"
              >
                Reset
              </Button>
            </Stack>
          </Box>
        </Stack>

        <Box mb={6}>
          <Text fontSize="md" color="red.500">
            Move image with w,a,s,d keys
          </Text>
        </Box>
        <Box data-cy-loaded={loadingState}>
          <Stack direction="row" spacing="24px">
            <ViewerWrapper className="viewer1">
              <InsightViewer
                image={image}
                viewport={viewport}
                onViewportChange={setViewport}
                Progress={CustomProgress}
              >
                <OverlayLayer viewport={viewport} />
              </InsightViewer>
            </ViewerWrapper>
            <ViewerWrapper className="viewer2">
              <InsightViewer
                image={image2}
                viewport={viewport2}
                onViewportChange={setViewport2}
                Progress={CustomProgress}
              >
                <OverlayLayer viewport={viewport2} />
              </InsightViewer>
            </ViewerWrapper>
          </Stack>
        </Box>

        <Box>
          <CodeBlock code={CODE} codeSandbox={CODE_SANDBOX.viewport} />
        </Box>
      </Box>
    </>
  )
}
