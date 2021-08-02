import { useState } from 'react'
import { Box, Text, Button, Stack } from '@chakra-ui/react'
import consola from 'consola'
import ImageViewer, {
  useImage,
  useInteraction,
  useViewport,
  Interaction,
  DragEvent,
  Drag,
  Click,
  isValidViewport,
} from '@lunit/insight-viewer'
import CodeBlock from '../../components/CodeBlock'
import Control from './Control'
import ClickControl from './Control/Click'
import OverlayLayer from '../../components/OverlayLayer'
import CustomProgress from '../../components/CustomProgress'
import { ViewerWrapper } from '../../components/Wrapper'
import { CUSTOM_CODE } from './Code'
import useIsOneColumn from '../../hooks/useIsOneColumn'
import { IMAGES } from '../../const'

export default function App(): JSX.Element {
  const [{ x, y }, setCoord] = useState<{
    x: number | undefined
    y: number | undefined
  }>({ x: undefined, y: undefined })
  const { loadingState, image } = useImage({
    imageId: IMAGES[7],
  })
  const { interaction, setInteraction } = useInteraction()
  const isOneColumn = useIsOneColumn()
  const {
    viewport: viewerViewport,
    setViewport,
    resetViewport,
  } = useViewport({
    scale: 1,
  })

  const customPan: Drag = ({ viewport, delta }) => {
    consola.info(
      'pan',
      viewport.translation?.x,
      viewport.translation?.y,
      delta.x,
      delta.y
    )

    setViewport(prev => {
      if (!isValidViewport(prev)) return prev
      return {
        ...prev,
        x: prev.x + delta.x / prev.scale,
        y: prev.y + delta.y / prev.scale,
      }
    })
  }

  const customAdjust: Drag = ({ viewport, delta }) => {
    consola.info(
      'adjust',
      viewport.voi.windowWidth,
      viewport.voi.windowCenter,
      delta.x,
      delta.y
    )
    setViewport(prev => {
      if (!isValidViewport(prev)) return prev
      return {
        ...prev,
        windowWidth: prev.windowWidth + delta.x / prev.scale,
        windowCenter: prev.windowCenter + delta.y / prev.scale,
      }
    })
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
        [type]:
          value === 'none'
            ? undefined
            : customClick[type as keyof typeof customClick],
      }))
    }
  }

  return (
    <Box data-cy-loaded={loadingState}>
      <Stack
        direction={['column', 'row']}
        spacing={isOneColumn ? '0px' : '80px'}
        align="flex-start"
      >
        <Box>
          <Control onChange={handleDrag} />
          <ClickControl onChange={handleClick} />
          <Box mb={6}>
            <Text>
              offset: <span className="click-x">{x?.toFixed(2) ?? 0}</span> /{' '}
              <span className="click-y">{y?.toFixed(2) ?? 0}</span>
            </Text>
          </Box>
        </Box>
        <Box>
          <Button
            colorScheme="blue"
            onClick={resetViewport}
            className="reset"
            mb={isOneColumn ? '20px' : '0px'}
          >
            Reset
          </Button>
        </Box>
      </Stack>

      <Stack direction="row">
        <ViewerWrapper>
          <ImageViewer
            image={image}
            interaction={interaction}
            viewport={viewerViewport}
            onViewportChange={setViewport}
            Progress={CustomProgress}
          >
            <OverlayLayer viewport={viewerViewport} />
          </ImageViewer>
        </ViewerWrapper>
      </Stack>

      <Box>
        <CodeBlock code={CUSTOM_CODE} />
      </Box>
    </Box>
  )
}
