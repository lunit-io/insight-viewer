import { Box } from '@chakra-ui/react'
import useInsightViewer from '@lunit/insight-viewer'
import CodeBlock from '../../components/CodeBlock'
import Overlay from './Overlay'
import Buttons from './Buttons'
import { ContextProvider } from './Context'

const IMAGE_ID =
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000011.dcm'

const Code = `\
  import useInsightViewer from '@lunit/insight-viewer'

  export default function App() {
    const { DICOMImageViewer, setViewport } = useInsightViewer()

    return (
      <>
        <button onClick={setViewport({ mouseDown: 'pan' })}>pan</button>
        <button onClick={setViewport({ mouseDown: undefined })}>drawing</button>

        <DICOMImageViewer imageId={IMAGE_ID}>
          <OverlayCanvas
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
        <Box w={500} h={500}>
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
