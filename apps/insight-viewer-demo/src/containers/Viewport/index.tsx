import { Box, HStack, Switch } from '@chakra-ui/react'
import Viewer, { useViewport } from '@lunit/insight-viewer'
import CodeBlock from '../../components/CodeBlock'
import OverlayLayer from '../Overlay/OverlayLayer'

const IMAGE_ID =
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000011.dcm'

const Code = `\
  import Viewer, { useViewport } from '@lunit/insight-viewer'

  export default function App() {
    const { viewport, setViewport } = useViewport()

    function updateViewport() {
      setViewport(prev => ({
        ...prev,
        invert: false,
        hflip: false,
        vflip: true,
        x: 10,
        y: 0,
        scale: 1,
        windowWidth: 128,
        windowCenter: 256
      }))
    }

    return (
      <>
        <button type="button" onClick={updateViewport}>update viewport</button>
        <Viewer.Dicom
          imageId={IMAGE_ID}
          viewport={viewport}
          setViewport={setViewport}
        />
      </>
    )
  }
  `

export default function App(): JSX.Element {
  const { viewport, setViewport } = useViewport()

  return (
    <>
      <Box w={700}>
        <Box mb={6}>
          <HStack spacing="24px">
            <Box>
              invert{' '}
              <Switch
                onChange={e =>
                  setViewport(prev => ({
                    ...prev,
                    invert: e.target.checked,
                  }))
                }
              />
            </Box>
            <Box>
              hflip{' '}
              <Switch
                onChange={e =>
                  setViewport(prev => ({
                    ...prev,
                    hflip: e.target.checked,
                  }))
                }
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
                  defaultValue={0}
                  onChange={e => {
                    setViewport(prev => ({
                      ...prev,
                      x: Number(e.target.value),
                    }))
                  }}
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
                  defaultValue={0}
                  onChange={e => {
                    setViewport(prev => ({
                      ...prev,
                      y: Number(e.target.value),
                    }))
                  }}
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
              min="1"
              max="2"
              step="0.1"
              defaultValue={1}
              onChange={e => {
                setViewport(prev => ({
                  ...prev,
                  scale: Number(e.target.value),
                }))
              }}
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
                  min="0"
                  max="256"
                  step="25.6"
                  defaultValue={128}
                  onChange={e => {
                    setViewport(prev => ({
                      ...prev,
                      windowWidth: Number(e.target.value),
                    }))
                  }}
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
                  min="0"
                  max="256"
                  step="25.6"
                  defaultValue={128}
                  onChange={e => {
                    setViewport(prev => ({
                      ...prev,
                      windowCenter: Number(e.target.value),
                    }))
                  }}
                />
              </Box>
            </Box>
          </HStack>
        </Box>
        <Box w={500} h={500}>
          <Viewer.Dicom
            imageId={IMAGE_ID}
            viewport={viewport}
            setViewport={setViewport}
          >
            <OverlayLayer viewport={viewport} />
          </Viewer.Dicom>
        </Box>
        <Box w={900}>
          <CodeBlock code={Code} />
        </Box>
      </Box>
    </>
  )
}
