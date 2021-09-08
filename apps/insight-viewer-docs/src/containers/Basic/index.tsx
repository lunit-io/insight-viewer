import { Box, Heading } from '@chakra-ui/react'
import InsightViewer, { useImage } from '@lunit/insight-viewer'
import CodeBlock from '../../components/CodeBlock'
import { ViewerWrapper } from '../../components/Wrapper'
import ImageSelectableViewer from './ImageSelectableViewer'
import { DICOM_CODE, WEB_CODE } from './Code'
import { CODE_SANDBOX } from '../../const'

export const WEB_URL =
  'https://rawgit.com/cornerstonejs/cornerstoneWebImageLoader/master/examples/Renal_Cell_Carcinoma.jpg'

function Basic(): JSX.Element {
  const { image } = useImage({
    imageId: WEB_URL,
    type: 'Web',
  })

  return (
    <>
      <ImageSelectableViewer />
      <Box>
        <CodeBlock code={DICOM_CODE} codeSandbox={CODE_SANDBOX.basic} />
      </Box>

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

export default Basic
