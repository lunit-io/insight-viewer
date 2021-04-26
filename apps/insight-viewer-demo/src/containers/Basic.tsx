import { Box, Heading } from '@chakra-ui/react'
import InsightViewer, { WebImageViewer } from '@lunit/insight-viewer'
import CodeBlock from '../components/CodeBlock'

const IMAGE_ID =
  'wadouri:https://raw.githubusercontent.com/cornerstonejs/cornerstoneWADOImageLoader/master/testImages/CT2_J2KR'

export const WEB_URL =
  'https://rawgit.com/cornerstonejs/cornerstoneWebImageLoader/master/examples/Renal_Cell_Carcinoma.jpg'

const code = `\
import InsightViewer from '@lunit/insight-viewer'

export default function() {
  return <InsightViewer imageId={IMAGE_ID} />
}
`

const vebImageViewercode = `\
import { WebImageViewer } from '@lunit/insight-viewer'

export default function() {
  return <InsightViewer imageId={WEB_URL} />
}
`

function Basic(): JSX.Element {
  return (
    <>
      <Box mb={6}>
        <Heading as="h3">InsightViewer</Heading>
      </Box>
      <Box w={700}>
        <Box w={500} h={500}>
          <InsightViewer imageId={IMAGE_ID} />
        </Box>
        <CodeBlock code={code} />
      </Box>
      <Box mt={10} mb={6}>
        <Heading as="h3">WebImageViewer</Heading>
      </Box>
      <Box w={700}>
        <Box w={500} h={500}>
          <WebImageViewer imageId={WEB_URL} />
        </Box>
        <CodeBlock code={vebImageViewercode} />
      </Box>
    </>
  )
}

export default Basic
