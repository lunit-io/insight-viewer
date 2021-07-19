import { Box, Heading } from '@chakra-ui/react'
import Viewer from '@lunit/insight-viewer'
import CodeBlock from '../../components/CodeBlock'
import ImageSelectableViewer from './ImageSelectableViewer'
import { DICOM_CODE, WEB_CODE } from './Code'

export const WEB_URL =
  'https://rawgit.com/cornerstonejs/cornerstoneWebImageLoader/master/examples/Renal_Cell_Carcinoma.jpg'

function Basic(): JSX.Element {
  return (
    <>
      <ImageSelectableViewer />
      <Box w={700}>
        <CodeBlock code={DICOM_CODE} />
      </Box>

      <Box mt={10} mb={6}>
        <Heading as="h3">WebImageViewer</Heading>
      </Box>
      <Box w={700}>
        <Box w={500} h={500}>
          <Viewer.Web imageId={WEB_URL} />
        </Box>
        <CodeBlock code={WEB_CODE} />
      </Box>
    </>
  )
}

export default Basic
