import { Box } from '@chakra-ui/react'
import InsightViewer, { useImage } from '@lunit/insight-viewer'
import { IMAGES } from '@insight-viewer-library/fixtures'
import CodeBlock from '../../components/CodeBlock'
import CustomProgress from '../../components/CustomProgress'
import { ViewerWrapper } from '../../components/Wrapper'
import { CUSTOM_CODE } from './Code'
import { CODE_SANDBOX } from '../../const'

export default function Custom(): JSX.Element {
  const { image } = useImage({
    wadouri: IMAGES[4],
  })

  return (
    <>
      <ViewerWrapper>
        <InsightViewer image={image} Progress={CustomProgress} />
      </ViewerWrapper>
      <Box>
        <CodeBlock code={CUSTOM_CODE} codeSandbox={CODE_SANDBOX.progress} />
      </Box>
    </>
  )
}
