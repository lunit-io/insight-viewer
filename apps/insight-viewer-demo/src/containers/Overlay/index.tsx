import { Box, UnorderedList, ListItem } from '@chakra-ui/react'
import useInsightViewer, { useViewport } from '@lunit/insight-viewer'
import CodeBlock from '../../components/CodeBlock'

const IMAGE_ID =
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000011.dcm'

const Code = `\
  import useInsightViewer, { useViewport } from '@lunit/insight-viewer'

  function OverlayLayer() {
    const {
      viewport: { scale, invert, hflip, vflip, x, y, windowWidth, windowCenter },
    } = useViewport()

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
        <OverlayLayer />
      </DICOMImageViewer>
    )
  }
  `

function OverlayLayer(): JSX.Element {
  const {
    viewport: { scale, invert, hflip, vflip, x, y, windowWidth, windowCenter },
  } = useViewport()

  return (
    <Box
      position="absolute"
      top="0"
      left="0"
      w="100%"
      h="100%"
      p="4"
      bg="rgba(255, 255, 255, .3)"
      color="blue.200"
      textShadow="1px 1px 1px black"
    >
      <UnorderedList>
        <ListItem>scale: {scale}</ListItem>
        <ListItem>
          hflip/vflip: {`${hflip}`} / {`${vflip}`}
        </ListItem>
        <ListItem>
          translation: {x} / {y}
        </ListItem>
        <ListItem>invert: {`${invert}`}</ListItem>
        <ListItem>
          voi: {windowWidth} / {windowCenter}
        </ListItem>
      </UnorderedList>
    </Box>
  )
}

function Overlay(): JSX.Element {
  const { DICOMImageViewer } = useInsightViewer()

  return (
    <Box w={700}>
      <Box w={500} h={500}>
        <DICOMImageViewer imageId={IMAGE_ID}>
          <OverlayLayer />
        </DICOMImageViewer>
      </Box>
      <Box w={700}>
        <CodeBlock code={Code} />
      </Box>
    </Box>
  )
}

export default Overlay
