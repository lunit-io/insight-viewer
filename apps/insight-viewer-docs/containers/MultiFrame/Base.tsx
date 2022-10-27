import { Box, Text, Stack } from '@chakra-ui/react'
import InsightViewer, { useMultipleImages, useFrame } from '@lunit/insight-viewer'
import { IMAGES } from '@insight-viewer-library/fixtures'
import React from 'react'
import CodeBlock from '../../components/CodeBlock'
import CustomProgress from '../../components/CustomProgress'
import { ViewerWrapper } from '../../components/Wrapper'
import { CODE } from './Code'
import { CODE_SANDBOX } from '../../const'

export default function Base(): JSX.Element {
  const { loadingStates, images } = useMultipleImages({
    wadouri: IMAGES,
  })
  const { frame, setFrame } = useFrame({
    initial: 0,
    max: images.length - 1,
  })

  function changeFrame(e: React.ChangeEvent<HTMLInputElement>): void {
    const {
      target: { value },
    } = e
    setFrame(Number(value))
  }

  return (
    <Box data-cy-loaded={loadingStates[frame]} data-cy-all-loaded={loadingStates[IMAGES.length - 1]}>
      <Stack spacing="24px" mt={3} mb={3} direction="row">
        <Box>
          <input
            type="range"
            id="frame"
            name="frame"
            min="0"
            max={IMAGES.length - 1}
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
          <b>{loadingStates[frame]}</b>
          {images[frame]?.imageId && <span data-cy-image> ({images[frame]?.imageId})</span>}
        </Text>
      </Box>
      <ViewerWrapper>
        <InsightViewer image={images[frame]} Progress={CustomProgress} />
      </ViewerWrapper>
      <Box>
        <CodeBlock code={CODE} codeSandbox={CODE_SANDBOX.multiframe} />
      </Box>
    </Box>
  )
}
