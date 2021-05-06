import { Box, Heading } from '@chakra-ui/react'
import useInsightViewer from '@lunit/insight-viewer'
import CodeBlock from '../../components/CodeBlock'
import useImageSelect from './useImageSelect'

export const WEB_URL =
  'https://rawgit.com/cornerstonejs/cornerstoneWebImageLoader/master/examples/Renal_Cell_Carcinoma.jpg'

const insightViewerCode = `\
import useImageSelect from './useImageSelect'

const { DICOMImageViewer } = useInsightViewer()

export default function() {
  return <DICOMImageViewer imageId={IMAGE_ID} />
}
`
const webImageViewerCode = `\
import useImageSelect from './useImageSelect'

const { WebImageViewer } = useInsightViewer()

export default function() {
  return <WebImageViewer imageId={WEB_URL} />
}
`

function Basic(): JSX.Element {
  const { ImageSelect, selected } = useImageSelect()
  const { DICOMImageViewer, WebImageViewer } = useInsightViewer()

  return (
    <>
      <Box mb={6}>
        <Heading as="h3">InsightViewer</Heading>
      </Box>

      <Box mb={6}>
        <ImageSelect />
      </Box>

      <div style={{ maxWidth: '100%', aspectRatio: '1 / 1' }}>
        <DICOMImageViewer imageId={selected} />
      </div>
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
