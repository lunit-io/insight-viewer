import { Box } from '@chakra-ui/react'
import InsightViewer, { useImage } from '@lunit/insight-viewer'
import { ViewerWrapper } from '../../components/Wrapper'
import CodeBlock from '../../components/CodeBlock'
import { useFileInput } from '../../hooks/useFileInput'
import { CODE } from './Code'

export default function DicomfileViewer(): JSX.Element {
  const { FileInput, imageId } = useFileInput()
  const { image } = useImage({
    dicomfile: imageId,
  })

  return (
    <>
      <Box mb={6}>
        <FileInput />
      </Box>
      <ViewerWrapper>
        <InsightViewer image={image} />
      </ViewerWrapper>
      <Box>
        <CodeBlock code={CODE} />
      </Box>
    </>
  )
}
