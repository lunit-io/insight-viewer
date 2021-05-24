import { Box, Heading, HStack, Switch } from '@chakra-ui/react'
import useInsightViewer from '@lunit/insight-viewer'
import CodeBlock from '../../components/CodeBlock'

const IMAGE_ID =
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000011.dcm'

const Code = `\
  import useInsightViewer from '@lunit/insight-viewer'
  
  export default function Viewer() {
    const { DICOMImageViewer, setViewport } = useInsightViewer()

    function handleViewport() {
      setViewport('invert', true)
      setViewport('hflip', false)
      setViewport('vflip', true)
      setViewport('x', 0)
      setViewport('y', 10)
      setViewport('scale', 1)
      setViewport('windowWidth', 128)
      setViewport('windowCenter', 256)
    }
  
    return <DICOMImageViewer imageId={IMAGE_ID} />
  }
  `

function Viewport(): JSX.Element {
  const { DICOMImageViewer, setViewport } = useInsightViewer()

  return (
    <>
      <Box mb={6}>
        <Heading as="h3">Viewport</Heading>
      </Box>

      <Box w={700}>
        <Box mb={6}>
          <HStack spacing="24px">
            <Box>
              Invert{' '}
              <Switch onChange={e => setViewport('invert', e.target.checked)} />
            </Box>
            <Box>
              Hflip{' '}
              <Switch onChange={e => setViewport('hflip', e.target.checked)} />
            </Box>
            <Box>
              vflip{' '}
              <Switch onChange={e => setViewport('vflip', e.target.checked)} />
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
                    setViewport('x', Number(e.target.value))
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
                    setViewport('y', Number(e.target.value))
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
                setViewport('scale', Number(e.target.value))
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
                    setViewport('windowWidth', Number(e.target.value))
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
                    setViewport('windowCenter', Number(e.target.value))
                  }}
                />
              </Box>
            </Box>
          </HStack>
        </Box>
        <Box w={500} h={500}>
          <DICOMImageViewer imageId={IMAGE_ID} />
        </Box>
        <Box w={700}>
          <CodeBlock code={Code} />
        </Box>
      </Box>
    </>
  )
}

export default Viewport
