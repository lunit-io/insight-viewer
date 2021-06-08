import { Box, Text } from '@chakra-ui/react'
import useInsightViewer from '@lunit/insight-viewer'
import CodeBlock from '../../components/CodeBlock'
import Overlay from './Overlay'
import Buttons from './Buttons'
import { ContextProvider } from './Context'

const IMAGE_ID =
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000011.dcm'

const Code = `\
  // Overlay.tsx
  import { useViewport, Viewport } from '@lunit/insight-viewer'

  function Overlay(): JSX.Element {
    const {
      viewport: { x, y },
      setViewport,
    } = useViewport()
  
    useEffect(() => {
      function handleKeyDown(e: KeyboardEvent) {
        if (e.key === 'ArrowDown') {
          setViewport((prev: Viewport) => ({
            ...prev,
            y: prev.y + 10,
          }))
        }
        if (e.key === 'ArrowUp') {
          setViewport((prev: Viewport) => ({
            ...prev,
            y: prev.y - 10,
          }))
        }
      }
      window.addEventListener('keydown', handleKeyDown)
  
      return () => {
        window.removeEventListener('keydown', handleKeyDown)
      }
    }, [setViewport])

    return ...
  }

  // App.tex
  import useInsightViewer from '@lunit/insight-viewer'

  export default function App() {
    const { DICOMImageViewer, setViewport } = useInsightViewer()

    return (
      <>
        <button onClick={setViewport({ mouseDown: 'pan' })}>pan</button>
        <button onClick={setViewport({ mouseDown: undefined })}>drawing</button>

        <DICOMImageViewer imageId={IMAGE_ID}>
          <Overlay
            onMouseDown={startDrawing}
            onMouseUp={stopDrawing}
            onMouseMove={draw}
          />
        </DICOMImageViewer>
      </>
    )
  }
  `

function OverlayEvent(): JSX.Element {
  const { DICOMImageViewer, setViewport } = useInsightViewer()

  return (
    <Box w={700}>
      <ContextProvider>
        <Box mb={6}>
          <Buttons setViewport={setViewport} />
        </Box>
        <Box mb={6}>
          <Text fontSize="md" color="red.500">
            Move image with ↑ ↓ arrow keys
          </Text>
        </Box>
        <Box w={500} h={500} overflow="hidden">
          <DICOMImageViewer imageId={IMAGE_ID}>
            <Overlay />
          </DICOMImageViewer>
        </Box>
      </ContextProvider>

      <Box w={700}>
        <CodeBlock code={Code} />
      </Box>
    </Box>
  )
}

export default OverlayEvent
