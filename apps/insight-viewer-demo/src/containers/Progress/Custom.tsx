import { Box } from '@chakra-ui/react'
import Viewer, { useImageLoad } from '@lunit/insight-viewer'
import CodeBlock from '../../components/CodeBlock'
import CustomProgress from '../../components/CustomProgress'
import { ViewerWrapper } from '../../components/Wrapper'
import { CUSTOM_CODE } from './Code'

const IMAGE_ID =
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000012.dcm'

export default function Custom(): JSX.Element {
  const { image } = useImageLoad({
    imageId: IMAGE_ID,
  })

  return (
    <>
      <ViewerWrapper>
        <Viewer.Dicom image={image} Progress={CustomProgress} />
      </ViewerWrapper>
      <Box>
        <CodeBlock code={CUSTOM_CODE} />
      </Box>
    </>
  )
}
