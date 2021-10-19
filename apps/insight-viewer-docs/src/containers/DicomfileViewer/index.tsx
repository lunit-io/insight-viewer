import { Box } from '@chakra-ui/react'
import InsightViewer, { useImage, useDicomFile } from '@lunit/insight-viewer'
import { ViewerWrapper } from '../../components/Wrapper'
import CodeBlock from '../../components/CodeBlock'
import FileInput from '../../components/FileInput'
import { CODE } from './Code'

export default function DicomfileViewer(): JSX.Element {
  const { imageId, setImageId } = useDicomFile()
  const { image } = useImage({
    dicomfile: imageId,
  })

  return (
    <>
      <Box mb={6}>
        <FileInput onChange={setImageId} />
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
