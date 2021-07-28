import { Box, Heading } from '@chakra-ui/react'
import Viewer, { useImageLoad } from '@lunit/insight-viewer'
import CodeBlock from '../../components/CodeBlock'
import { ViewerWrapper } from '../../components/Wrapper'
import ImageSelectableViewer from './ImageSelectableViewer'
import { DICOM_CODE, WEB_CODE } from './Code'

export const WEB_URL =
  'https://rawgit.com/cornerstonejs/cornerstoneWebImageLoader/master/examples/Renal_Cell_Carcinoma.jpg'

function Basic(): JSX.Element {
  const { image } = useImageLoad({
    imageId: WEB_URL,
    type: 'Web',
  })

  return (
    <>
      <ImageSelectableViewer />
      <Box>
        <CodeBlock code={DICOM_CODE} />
      </Box>

      <Box mt={10} mb={6}>
        <Heading as="h3">WebImageViewer</Heading>
      </Box>
      <ViewerWrapper>
        <Viewer.Web image={image} />
      </ViewerWrapper>
      <CodeBlock code={WEB_CODE} />
    </>
  )
}

export default Basic
