import { Box, Heading } from '@chakra-ui/react'
import Viewer, { useImageLoad } from '@lunit/insight-viewer'
import CodeBlock from '../../components/CodeBlock'
import { ViewerWrapper } from '../../components/Wrapper'
import { CODE } from './Code'

const IMAGE_ID = 'wadouri:/msw/with-jwt'
const requestInterceptor = (request: Request) => {
  request.headers.set('Authorization', 'Bearer blahblah')
}

export default function WithJwt(): JSX.Element {
  const { image } = useImageLoad({
    imageId: IMAGE_ID,
    requestInterceptor,
  })

  return (
    <>
      <Box mb={6}>
        <Heading as="h4">jwt header</Heading>
      </Box>
      <Box>
        <ViewerWrapper>
          <Viewer.Dicom image={image} />
        </ViewerWrapper>
        <CodeBlock code={CODE} />
      </Box>
    </>
  )
}
