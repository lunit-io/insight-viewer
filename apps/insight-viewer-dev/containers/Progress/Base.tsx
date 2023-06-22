import { Box } from '@chakra-ui/react'
import InsightViewer, { useImage } from '@lunit/insight-viewer'
import CodeBlock from '../../components/CodeBlock'
import { ViewerWrapper } from '../../components/Wrapper'
import { BASE_CODE } from './Code'
import { IMAGES } from '@insight-viewer-library/fixtures'

export default function Base(): JSX.Element {
  const { image } = useImage({
    wadouri: IMAGES[3],
  })

  return (
    <>
      <ViewerWrapper>
        <InsightViewer image={image} />
      </ViewerWrapper>
      <Box>
        <CodeBlock code={BASE_CODE} />
      </Box>
    </>
  )
}
