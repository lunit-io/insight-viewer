import { Box, Text, Stack } from '@chakra-ui/react'
import ImageViewer, { useMultiframeImages } from '@lunit/insight-viewer'
import React from 'react'
import CodeBlock from '../../components/CodeBlock'
import CustomProgress from '../../components/CustomProgress'
import { ViewerWrapper } from '../../components/Wrapper'
import { CODE } from './Code'
import { IMAGES } from '../../const'

export default function Base(): JSX.Element {
  const { frame, setFrame, loadingState, image } = useMultiframeImages({
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
          <b data-cy-loaded={loadingState}>{loadingState}</b>
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
