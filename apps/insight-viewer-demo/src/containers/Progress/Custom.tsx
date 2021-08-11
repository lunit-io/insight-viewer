import { Box } from '@chakra-ui/react'
import InsightViewer, { useImage } from '@lunit/insight-viewer'
import CodeBlock from '../../components/CodeBlock'
import CustomProgress from '../../components/CustomProgress'
import { ViewerWrapper } from '../../components/Wrapper'
import { CUSTOM_CODE } from './Code'
import { IMAGES } from '../../const'

export default function Custom(): JSX.Element {
  const { image } = useImage({
    imageId: IMAGES[4],
  })

  return (
    <>
      <ViewerWrapper>
        <InsightViewer image={image} Progress={CustomProgress} />
      </ViewerWrapper>
      <Box>
        <CodeBlock code={CUSTOM_CODE} />
      </Box>
    </>
  )
}
