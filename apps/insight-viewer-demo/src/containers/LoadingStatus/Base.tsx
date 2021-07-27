import { Box, Text } from '@chakra-ui/react'
import Viewer, { useImageLoadStatus } from '@lunit/insight-viewer'
import CodeBlock from '../../components/CodeBlock'
import CustomProgress from '../../components/CustomProgress'
import { ViewerWrapper } from '../../components/Wrapper'
import { CODE } from './Code'

const IMAGE_ID =
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000011.dcm'

export default function Base(): JSX.Element {
  const { loadingStatus, setLoadingStatus, loaded } = useImageLoadStatus()

  return (
    <Box>
      <Box mb={6}>
        <Text className="test">
          loadingStatus:{' '}
          <span data-cy-loading-status="loading-status">{loadingStatus}</span>
          {loaded && <span> ({loaded.imageId})</span>}
        </Text>
      </Box>
      <ViewerWrapper>
        <Viewer.Dicom
          imageId={IMAGE_ID}
          Progress={CustomProgress}
          setLoadingStatus={setLoadingStatus}
        />
      </ViewerWrapper>
      <Box>
        <CodeBlock code={CODE} />
      </Box>
    </Box>
  )
}
