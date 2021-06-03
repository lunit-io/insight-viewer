import { Box } from '@chakra-ui/react'
import useInsightViewer from '@lunit/insight-viewer'
import CodeBlock from '../../components/CodeBlock'
import Overlay from './Overlay'

const IMAGE_ID =
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000011.dcm'

const Code = `\
  import useInsightViewer, { Viewport, useViewport } from '@lunit/insight-viewer'

  function Nested({ viewport }: {viewport: Viewport }) {
    const { scale, invert, hflip, vflip, x, y, windowWidth, windowCenter } =
    useViewport()

    return (
      <ul>
        <li>scale: {scale}</li>
        <li>hflip/vflip: {hflip} / {vflip}</li>
        <li>translation: {x} / {y}</li>
        <li>invert: {invert}</li>
        <li>voi: {windowWidth} / {windowCenter}</li>
      </ul>
    )
  }

  export default function Viewer() {
    const { DICOMImageViewer } = useInsightViewer()

    return (
      <DICOMImageViewer imageId={IMAGE_ID}>
        <Nested />
      </DICOMImageViewer>
    )
  }
  `

function OverlayEvent(): JSX.Element {
  const { DICOMImageViewer } = useInsightViewer()

  return (
    <Box w={700}>
      <Box w={500} h={500}>
        <DICOMImageViewer imageId={IMAGE_ID}>
          <Overlay />
        </DICOMImageViewer>
      </Box>
      <Box w={700}>
        <CodeBlock code={Code} />
      </Box>
    </Box>
  )
}

export default OverlayEvent
