import { useEffect } from 'react'
import { Box, Text, HStack, Switch, Button } from '@chakra-ui/react'
import Viewer, { useViewport, Viewport } from '@lunit/insight-viewer'
import CodeBlock from '../../components/CodeBlock'
import OverlayLayer from '../../components/OverlayLayer'
import CustomProgress from '../../components/CustomProgress'
import { CODE } from './Code'
import useIsMount from '../../hooks/useIsMount'

const IMAGE_ID =
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000011.dcm'

const IMAGE_ID2 =
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000010.dcm'

export default function App(): JSX.Element {
  const { viewport, setViewport, resetViewport } = useViewport({
    scale: 0.5,
    windowWidth: 90,
    windowCenter: 32,
  })

  const {
    viewport: viewport2,
    setViewport: setViewport2,
    resetViewport: resetViewport2,
  } = useViewport({
    scale: 1,
    windowWidth: 150,
    windowCenter: 50,
  })

  const isMount = useIsMount()

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
        <HStack spacing="240px" align="flex-start">
          <Box mb={6}>
            <HStack spacing="24px">
              <Box>
                invert{' '}
                <Switch
                  onChange={e =>
                    setViewport({
                      ...viewport,
                      invert: e.target.checked,
                    })
                  }
                  className="invert"
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
                  className="hflip"
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
                  className="vflip"
                  isChecked={viewport.vflip}
                />
              </Box>
            </HStack>
            <HStack spacing="24px" mt={3}>
              <Box>
                <Box>x transition</Box>
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
                    className="x-transition"
                    value={viewport.x}
                  />
                </Box>
              </Box>
              <Box>
                <Box>y transition</Box>
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
                    className="y-transition"
                    value={viewport.y}
                  />
                </Box>
              </Box>
            </HStack>

            <Box>zoom</Box>
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
                className="zoom"
                value={viewport.scale}
              />
            </Box>
            <HStack spacing="24px" mt={3}>
              <Box>
                <Box>windowWidth</Box>
                <Box>
                  <input
                    type="range"
                    id="windowWidth"
                    name="windowWidth"
                    min="9"
                    max="171"
                    step="9"
                    onChange={e => {
                      setViewport(prev => ({
                        ...prev,
                        windowWidth: Number(e.target.value),
                      }))
                    }}
                    className="window-width"
                    value={viewport.windowWidth}
                  />
                </Box>
              </Box>
              <Box>
                <Box>windowCenter</Box>
                <Box>
                  <input
                    type="range"
                    id="windowCenter"
                    name="windowCenter"
                    min="-48"
                    max="112"
                    step="16"
                    onChange={e => {
                      setViewport(prev => ({
                        ...prev,
                        windowCenter: Number(e.target.value),
                      }))
                    }}
                    className="window-center"
                    value={viewport.windowCenter}
                  />
                </Box>
              </Box>
              <Button colorScheme="blue" onClick={handleFirstReset}>
                Reset
              </Button>
            </HStack>
          </Box>
          <Box mb={6}>
            <HStack spacing="24px" mt={35}>
              <Box>
                <Box>x transition</Box>
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
                    className="x-transition2"
                    value={viewport2.x}
                  />
                </Box>
              </Box>
              <Box>
                <Box>y transition</Box>
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
                    className="y-transition2"
                    value={viewport2.y}
                  />
                </Box>
              </Box>
              <Button colorScheme="blue" onClick={handleSecondReset}>
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
        <Box className={isMount ? 'is-mount' : ''}>
          <HStack spacing="24px">
            <Box w={500} h={500}>
              <Viewer.Dicom
                imageId={IMAGE_ID}
                viewport={viewport}
                onViewportChange={setViewport}
                Progress={CustomProgress}
              >
                <OverlayLayer viewport={viewport} />
              </Viewer.Dicom>
            </Box>
            <Box w={500} h={500}>
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
