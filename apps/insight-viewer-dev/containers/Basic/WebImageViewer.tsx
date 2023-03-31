import { Box, Heading } from '@chakra-ui/react'
import InsightViewer, { useImage } from '@lunit/insight-viewer'
import CodeBlock from '../../components/CodeBlock'
import { ViewerWrapper } from '../../components/Wrapper'
import { WEB_CODE } from './Code'

export const WEB_URL =
  'https://rawgit.com/cornerstonejs/cornerstoneWebImageLoader/master/examples/Renal_Cell_Carcinoma.jpg'

function WebImageViewer(): JSX.Element {
  const { image } = useImage({
    web: WEB_URL,
  })

  return (
    <>
      <Box mt={10} mb={6}>
        <Heading as="h3">WebImageViewer</Heading>
      </Box>
      <ViewerWrapper>
        <InsightViewer image={image} />
      </ViewerWrapper>
      <CodeBlock code={WEB_CODE} />
    </>
  )
}

export default WebImageViewer
