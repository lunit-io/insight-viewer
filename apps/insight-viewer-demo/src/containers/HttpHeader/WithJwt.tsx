import { Box, Heading } from '@chakra-ui/react'
import useInsightViewer from '@lunit/insight-viewer'
import CodeBlock from '../../components/CodeBlock'
import config from '../../../config'

const Code = `\
import useInsightViewer from '@lunit/insight-viewer'

const { DICOMImageViewer } = useInsightViewer({
  setHeader: (request: Request) => {
    request.headers.set('Authorization', 'Bearer blahblah')
  },
})

export default function() {
  return <DICOMImageViewer imageId={IMAGE_ID} />
}
`
const IMAGE_ID = 'wadouri:http://localhost:3000/api/with-jwt'

export default function WithJwt(): JSX.Element {
  const { DICOMImageViewer } = useInsightViewer({
    setHeader: (request: Request) => {
      request.headers.set('Authorization', 'Bearer blahblah')
    },
  })

  return (
    <>
      <Box mb={6}>
        <Heading as="h4">jwt header</Heading>
      </Box>
      <Box w={700}>
        {config.IS_DEV && (
          <Box w={500} h={500}>
            <DICOMImageViewer imageId={IMAGE_ID} />
          </Box>
        )}
        <CodeBlock code={Code} />
      </Box>
    </>
  )
}
