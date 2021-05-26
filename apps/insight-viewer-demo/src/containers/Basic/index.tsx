import { Box, Heading } from '@chakra-ui/react'
import useInsightViewer from '@lunit/insight-viewer'
import CodeBlock from '../../components/CodeBlock'
import SelectableImage from './SelectableImage'

export const WEB_URL =
  'https://rawgit.com/cornerstonejs/cornerstoneWebImageLoader/master/examples/Renal_Cell_Carcinoma.jpg'

const insightViewerCode = `\
import useInsightViewer from '@lunit/insight-viewer'

const { DICOMImageViewer } = useInsightViewer()

export default function() {
  return <DICOMImageViewer imageId={IMAGE_ID} />
}
`
const webImageViewerCode = `\
import useInsightViewer from '@lunit/insight-viewer'

const { WebImageViewer } = useInsightViewer()

export default function() {
  return <WebImageViewer imageId={WEB_URL} />
}
`

function Basic(): JSX.Element {
  const { WebImageViewer } = useInsightViewer()

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
          <WebImageViewer imageId={WEB_URL} />
        </Box>
        <CodeBlock code={webImageViewerCode} />
      </Box>
    </>
  )
}

export default Basic
