import { Box, Heading } from '@chakra-ui/react'
import Viewer from '@lunit/insight-viewer'
import CodeBlock from '../../components/CodeBlock'
import { ViewerWrapper } from '../../components/Wrapper'
import { CODE } from './Code'

const IMAGE_ID = 'wadouri:/msw/with-jwt'

export default function WithJwt(): JSX.Element {
  const requestInterceptor = (request: Request) => {
    request.headers.set('Authorization', 'Bearer blahblah')
  }

  return (
    <>
      <Box mb={6}>
        <Heading as="h4">jwt header</Heading>
      </Box>
      <Box>
        <ViewerWrapper>
          <Viewer.Dicom
            imageId={IMAGE_ID}
            requestInterceptor={requestInterceptor}
          />
        </ViewerWrapper>
        <CodeBlock code={CODE} />
      </Box>
    </>
  )
}
