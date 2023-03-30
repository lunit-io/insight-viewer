import { Box, Text } from '@chakra-ui/react'
import InsightViewer, { useImage } from '@lunit/insight-viewer'
import { WRONG_IMAGE } from '@insight-viewer-library/fixtures'
import CodeBlock from '../../components/CodeBlock'
import { ViewerWrapper } from '../../components/Wrapper'
import { BASE_CODE } from './Code'

export default function Base(): JSX.Element {
  const { image } = useImage({
    wadouri: WRONG_IMAGE,
  })

  return (
    <>
      <Box mb={3}>
        <Text>Chrome Dev Console에서 error 표시</Text>
      </Box>
      <ViewerWrapper>
        <InsightViewer image={image} />
      </ViewerWrapper>
      <Box>
        <CodeBlock code={BASE_CODE} />
      </Box>
    </>
  )
}
