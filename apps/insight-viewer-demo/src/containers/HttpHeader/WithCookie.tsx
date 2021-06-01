import { Box, Heading } from '@chakra-ui/react'
import useInsightViewer from '@lunit/insight-viewer'
import CodeBlock from '../../components/CodeBlock'

const Code = `\
import useInsightViewer from '@lunit/insight-viewer'

const { DICOMImageViewer } = useInsightViewer({
  setHeader: () => {
    // for testing
    document.cookie =
      'authToken=test; expires=Sun, 1 Jan 2023 00:00:00 UTC; path=/'
  },
})

export default function() {
  return <DICOMImageViewer imageId={IMAGE_ID} />
}
`
const IMAGE_ID = 'wadouri:/api/with-cookie'

export default function WithCookie(): JSX.Element {
  const { DICOMImageViewer } = useInsightViewer({
    setHeader: () => {
      // for local Test
      document.cookie =
        'authToken=test; expires=Sun, 1 Jan 2023 00:00:00 UTC; path=/'
    },
  })

  return (
    <>
      <Box mb={6}>
        <Heading as="h4">cookie header</Heading>
      </Box>
      <Box w={700}>
        <Box w={500} h={500}>
          <DICOMImageViewer imageId={IMAGE_ID} />
        </Box>
        <CodeBlock code={Code} />
      </Box>
    </>
  )
}
