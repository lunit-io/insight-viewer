import { Box, UnorderedList, ListItem } from '@chakra-ui/react'
import useInsightViewer, { Viewport } from '@lunit/insight-viewer'
import CodeBlock from '../../components/CodeBlock'
import { WithChildren } from '../../types'

const IMAGE_ID =
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000011.dcm'

const Code = `\
  import useInsightViewer, { Viewport } from '@lunit/insight-viewer'

  function Nested({ viewport }: {viewport: Viewport }) {
    return (
      <ul>
        <li>scale: {viewport?.scale}</li>
        <li>
          hflip/vflip: {viewport?.hflip} / {viewport?.vflip}
        </li>
        <li>
          translation: {viewport?.translation?.x} / {viewport?.translation?.y}
        </li>
        <li>invert: {viewport?.invert}</li>
        <li>
          voi: {viewport?.voi?.windowWidth} / {viewport?.voi?.windowCenter}
        </li>
      </ul>
    )
  }

  export default function Viewer() {
    const { DICOMImageViewer, ViewportConsumer } = useInsightViewer()

    return (
      <DICOMImageViewer imageId={IMAGE_ID}>
        <ViewportConsumer>
          {viewport => <Nested viewport={viewport} />}
        </ViewportConsumer>
      </DICOMImageViewer>
    )
  }
  `

function Nested({
  viewport,
}: WithChildren<{ viewport?: Viewport }>): JSX.Element {
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
        <ListItem>scale: {viewport?.scale}</ListItem>
        <ListItem>
          hflip/vflip: {`${viewport?.hflip}`} / {`${viewport?.vflip}`}
        </ListItem>
        <ListItem>
          translation: {viewport?.translation?.x} / {viewport?.translation?.y}
        </ListItem>
        <ListItem>invert: {`${viewport?.invert}`}</ListItem>
        <ListItem>
          voi: {viewport?.voi?.windowWidth} / {viewport?.voi?.windowCenter}
        </ListItem>
      </UnorderedList>
    </Box>
  )
}

function Overlay(): JSX.Element {
  const { DICOMImageViewer, ViewportConsumer } = useInsightViewer()

  return (
    <Box w={700}>
      <Box w={500} h={500}>
        <DICOMImageViewer imageId={IMAGE_ID}>
          <ViewportConsumer>
            {viewport => <Nested viewport={viewport} />}
          </ViewportConsumer>
        </DICOMImageViewer>
      </Box>
      <Box w={700}>
        <CodeBlock code={Code} />
      </Box>
    </Box>
  )
}

export default Overlay
