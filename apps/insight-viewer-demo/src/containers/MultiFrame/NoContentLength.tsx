import { Box } from '@chakra-ui/react'
import useInsightViewer from '@lunit/insight-viewer'

const IMAGES = [
  'wadouri:/api/no-content-length/1',
  'wadouri:/api/no-content-length/2',
  'wadouri:/api/no-content-length/3',
]

export default function NoContentLength(): JSX.Element {
  const { DICOMImageViewer } = useInsightViewer({
    images: IMAGES,
  })

  return (
    <Box w={500} h={500}>
      <DICOMImageViewer imageId={IMAGES[0]} />
    </Box>
  )
}
