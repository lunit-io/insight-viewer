import { Box, Text, Stack } from '@chakra-ui/react'
import ImageViewer, { useFrames } from '@lunit/insight-viewer'
import React from 'react'
import CodeBlock from '../../components/CodeBlock'
import CustomProgress from '../../components/CustomProgress'
import { ViewerWrapper } from '../../components/Wrapper'
import { CODE } from './Code'

const IMAGES = [
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000000.dcm',
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000001.dcm',
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000002.dcm',
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000003.dcm',
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000004.dcm',
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000005.dcm',
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000006.dcm',
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000007.dcm',
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000008.dcm',
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000009.dcm',
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000010.dcm',
]

export default function Base(): JSX.Element {
  const { frame, setFrame, loadingState, image /* progress */ } = useFrames({
    imageIds: IMAGES,
  })

  function changeFrame(e: React.ChangeEvent<HTMLInputElement>): void {
    const {
      target: { value },
    } = e
    setFrame(Number(value))
  }

  return (
    <Box data-cy-loaded={loadingState}>
      <Stack spacing="24px" mt={3} mb={3} direction="row">
        <Box>
          <input
            type="range"
            id="frame"
            name="frame"
            min="0"
            max="10"
            step="1"
            onChange={changeFrame}
            className="frame-control"
            value={frame}
          />
        </Box>
        <div>
          frame: <span className="frame-number">{frame}</span>
        </div>
      </Stack>

      <Box mb={3}>
        <Text>
          <b data-cy-loading-state="loading-state">{loadingState}</b>
          {image && <span> ({image.imageId})</span>}
        </Text>
      </Box>
      <ViewerWrapper>
        <ImageViewer image={image} Progress={CustomProgress} />
      </ViewerWrapper>
      <Box>
        <CodeBlock code={CODE} />
      </Box>
    </Box>
  )
}
