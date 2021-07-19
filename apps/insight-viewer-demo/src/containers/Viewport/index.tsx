import { useEffect } from 'react'
import { Box, Text, HStack, Switch, Button } from '@chakra-ui/react'
import Viewer, { useViewport, Viewport } from '@lunit/insight-viewer'
import CodeBlock from '../../components/CodeBlock'
import OverlayLayer from '../../components/OverlayLayer'
import CustomProgress from '../../components/CustomProgress'
import { CODE } from './Code'
import { INITIAL_VIEWPORT1, INITIAL_VIEWPORT2 } from './const'

const IMAGE_ID =
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000011.dcm'

const IMAGE_ID2 =
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000010.dcm'

export default function App(): JSX.Element {
  const { viewport, setViewport, resetViewport } =
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

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 's') {
        setViewport((prev: Viewport) => ({
          ...prev,
          y: prev.y + 10,
        }))
      }
      if (e.key === 'w') {
        setViewport((prev: Viewport) => ({
          ...prev,
          y: prev.y - 10,
        }))
      }
      if (e.key === 'd') {
        setViewport((prev: Viewport) => ({
          ...prev,
          x: prev.x + 10,
        }))
      }
      if (e.key === 'a') {
        setViewport((prev: Viewport) => ({
          ...prev,
          x: prev.x - 10,
        }))
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [setViewport])

  return (
    <>
      <Box w={1100}>
        <HStack spacing="110px" align="flex-start">
          <Box mb={6}>
            <HStack spacing="24px" mt={3}>
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
                      setViewport(prev => ({
                        ...prev,
                        x: Number(e.target.value),
                      }))
                    }}
                    className="x-control"
                    value={viewport.x}
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
                      setViewport(prev => ({
                        ...prev,
                        y: Number(e.target.value),
                      }))
                    }}
                    className="y-control"
                    value={viewport.y}
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
            </HStack>

            <HStack spacing="24px" mt={3}>
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
                      setViewport(prev => ({
                        ...prev,
                        windowWidth: Number(e.target.value),
                      }))
                    }}
                    className="window-width-control"
                    value={viewport.windowWidth}
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
                      setViewport(prev => ({
                        ...prev,
                        windowCenter: Number(e.target.value),
                      }))
                    }}
                    className="window-center-control"
                    value={viewport.windowCenter}
                  />
                </Box>
              </Box>
            </HStack>
            <HStack spacing="24px">
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
                      setViewport(prev => ({
                        ...prev,
                        scale: Number(e.target.value),
                      }))
                    }}
                    className="scale-control"
                    value={viewport.scale}
                  />
                </Box>
              </Box>
              <Box>
                invert{' '}
                <Switch
                  onChange={e =>
                    setViewport({
                      ...viewport,
                      invert: e.target.checked,
                    })
                  }
                  className="invert-control"
                  isChecked={viewport.invert}
                />
              </Box>
              <Box>
                hflip{' '}
                <Switch
                  onChange={e =>
                    setViewport({
                      ...viewport,
                      hflip: e.target.checked,
                    })
                  }
                  className="hflip-control"
                  isChecked={viewport.hflip}
                />
              </Box>
              <Box>
                vflip{' '}
                <Switch
                  onChange={e =>
                    setViewport(prev => ({
                      ...prev,
                      vflip: e.target.checked,
                    }))
                  }
                  className="vflip-control"
                  isChecked={viewport.vflip}
                />
              </Box>
            </HStack>
          </Box>
          <Box mb={6}>
            <HStack spacing="24px">
              <Box>
                <Box>x transition {viewport2.x}</Box>
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
                    value={viewport2.x}
                  />
                </Box>
              </Box>
              <Box>
                <Box>y transition {viewport2.y}</Box>
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
                    value={viewport2.y}
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
            </HStack>
          </Box>
        </HStack>

        <Box mb={6}>
          <Text fontSize="md" color="red.500">
            Move image with w,a,s,d keys
          </Text>
        </Box>
        <Box>
          <HStack spacing="24px">
            <Box w={500} h={500} className="viewer1">
              <Viewer.Dicom
                imageId={IMAGE_ID}
                viewport={viewport}
                onViewportChange={setViewport}
                Progress={CustomProgress}
              >
                <OverlayLayer viewport={viewport} />
              </Viewer.Dicom>
            </Box>
            <Box w={500} h={500} className="viewer2">
              <Viewer.Dicom
                imageId={IMAGE_ID2}
                viewport={viewport2}
                onViewportChange={setViewport2}
                Progress={CustomProgress}
              >
                <OverlayLayer viewport={viewport2} />
              </Viewer.Dicom>
            </Box>
          </HStack>
        </Box>

        <Box w={900}>
          <CodeBlock code={CODE} />
        </Box>
      </Box>
    </>
  )
}
