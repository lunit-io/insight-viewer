import { Box, Heading } from '@chakra-ui/react'
import Viewer from '@lunit/insight-viewer'
import CodeBlock from '../../components/CodeBlock'
import SelectableImage from './SelectableImage'

export const WEB_URL =
  'https://rawgit.com/cornerstonejs/cornerstoneWebImageLoader/master/examples/Renal_Cell_Carcinoma.jpg'

const insightViewerCode = `\
import Viewer from '@lunit/insight-viewer'

export default function() {
  return <Viewer.Dicom imageId={IMAGE_ID} />
}
`
const webImageViewerCode = `\
import Viewer from '@lunit/insight-viewer'

export default function() {
  return <Viewer.Web imageId={WEB_URL} />
}
`

function Basic(): JSX.Element {
  return (
    <>
      <SelectableImage />
      <Box w={700}>
        <CodeBlock code={insightViewerCode} />
      </Box>

      <Box mt={10} mb={6}>
        <Heading as="h3">WebImageViewer</Heading>
      </Box>
      <Box w={700}>
        <Box w={500} h={500}>
          <Viewer.Web imageId={WEB_URL} />
        </Box>
        <CodeBlock code={webImageViewerCode} />
      </Box>
    </>
  )
}

export default Basic
