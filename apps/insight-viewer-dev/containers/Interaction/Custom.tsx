import { useState } from 'react'
import { useRef } from 'react'
import { Box, Text, Button, Stack } from '@chakra-ui/react'
import consola from 'consola'
import InsightViewer, { useImage, useInteraction, Interaction, DragEvent, Drag, Click } from '@lunit/insight-viewer'
import { useViewport } from '@lunit/insight-viewer/viewport'
import { IMAGES } from '@insight-viewer-library/fixtures'
import CodeBlock from '../../components/CodeBlock'
import Control from './Control'
import ClickControl from './Control/Click'
import OverlayLayer from '../../components/OverlayLayer'
import CustomProgress from '../../components/CustomProgress'
import { ViewerWrapper } from '../../components/Wrapper'
import { CUSTOM_CODE } from './Code'

export default function App(): JSX.Element {
  const viewerRef = useRef<HTMLDivElement>(null)

  const [{ x, y }, setCoord] = useState<{
    x: number | undefined
    y: number | undefined
  }>({ x: undefined, y: undefined })
  const { loadingState, image } = useImage({
    wadouri: IMAGES[7],
  })
  const { interaction, setInteraction } = useInteraction()

  const {
    viewport: viewerViewport,
    setViewport,
    resetViewport,
  } = useViewport({
    image,
    viewerRef,
    getInitialViewport: (prevViewport) => ({ ...prevViewport, scale: 1 }),
  })

  const customPan: Drag = ({ viewport, delta }) => {
    consola.info('pan', viewport.translation?.x, viewport.translation?.y, delta.x, delta.y)

    setViewport((prev) => ({
      ...prev,
      x: prev.x + delta.x / prev.scale,
      y: prev.y + delta.y / prev.scale,
    }))
  }

  const customAdjust: Drag = ({ viewport, delta }) => {
    consola.info('adjust', viewport.voi.windowWidth, viewport.voi.windowCenter, delta.x, delta.y)
    setViewport((prev) => ({
      ...prev,
      windowWidth: prev.windowWidth + delta.x / prev.scale,
      windowCenter: prev.windowCenter + delta.y / prev.scale,
    }))
  }

  const customZoom: Drag = ({ viewport, delta }) => {
    consola.info('zoom', viewport.scale, delta.x, delta.y)
    setViewport((prev) => ({
      ...prev,
      scale: prev.scale + delta.x / 100,
    }))
  }

  const primaryClick: Click = (offsetX, offsetY) => {
    setCoord({
      x: offsetX,
      y: offsetY,
    })
  }

  const secondaryClick: Click = (offsetX, offsetY) => {
    setCoord({
      x: offsetX,
      y: offsetY,
    })
  }

  const customDrag = {
    pan: customPan,
    adjust: customAdjust,
    zoom: customZoom,
  }

  const customClick = {
    primaryClick,
    secondaryClick,
  }

  function handleDrag(type: string) {
    return (value: DragEvent | 'none') => {
      setInteraction((prev: Interaction) => ({
        ...prev,
        [type]: value === 'none' ? undefined : customDrag[value],
      }))
    }
  }

  function handleClick(type: string) {
    return (value: string) => {
      setInteraction((prev: Interaction) => ({
        ...prev,
        [type]: value === 'none' ? undefined : customClick[type as keyof typeof customClick],
      }))
    }
  }

  return (
    <Box data-cy-loaded={loadingState}>
      <Stack direction="row" spacing="80px" align="flex-start">
        <Box>
          <Control onChange={handleDrag} />
          <ClickControl onChange={handleClick} />
          <Box mb={6}>
            <Text>
              offset: <span data-cy-click-x>{Math.round(x ?? 0)}</span> /{' '}
              <span data-cy-click-y>{Math.round(y ?? 0)}</span>
            </Text>
          </Box>
        </Box>
        <Box>
          <Button colorScheme="blue" onClick={resetViewport} className="reset">
            Reset
          </Button>
        </Box>
      </Stack>

      <Stack direction="row">
        <ViewerWrapper>
          <InsightViewer
            viewerRef={viewerRef}
            image={image}
            interaction={interaction}
            viewport={viewerViewport}
            onViewportChange={setViewport}
            Progress={CustomProgress}
          >
            <OverlayLayer viewport={viewerViewport} />
          </InsightViewer>
        </ViewerWrapper>
      </Stack>

      <Box>
        <CodeBlock code={CUSTOM_CODE} />
      </Box>
    </Box>
  )
}
