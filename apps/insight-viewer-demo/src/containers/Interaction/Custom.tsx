import { useState } from 'react'
import { Box, Text, Button, Stack } from '@chakra-ui/react'
import consola from 'consola'
import Viewer, {
  useInteraction,
  useViewport,
  Interaction,
  DragEvent,
  Drag,
  Click,
} from '@lunit/insight-viewer'
import CodeBlock from '../../components/CodeBlock'
import Control from './Control'
import ClickControl from './Control/Click'
import OverlayLayer from '../../components/OverlayLayer'
import CustomProgress from '../../components/CustomProgress'
import { CUSTOM_CODE } from './Code'
import { DEFAULT_SCALE } from './const'

const IMAGE_ID =
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000011.dcm'

export default function App(): JSX.Element {
  const [{ x, y }, setCoord] = useState<{
    x: number | undefined
    y: number | undefined
  }>({ x: undefined, y: undefined })
  const { interaction, setInteraction } = useInteraction()
  const {
    viewport: viewerViewport,
    setViewport,
    resetViewport,
  } = useViewport({
    scale: DEFAULT_SCALE,
  })

  const customPan: Drag = ({ viewport, delta }) => {
    consola.info(
      'pan',
      viewport.translation.x,
      viewport.translation.y,
      delta.x,
      delta.y
    )

    setViewport(prev => ({
      ...prev,
      x: prev.x + delta.x / prev.scale,
      y: prev.y + delta.y / prev.scale,
    }))
  }

  const customAdjust: Drag = ({ viewport, delta }) => {
    consola.info(
      'adjust',
      viewport.voi.windowWidth,
      viewport.voi.windowCenter,
      delta.x,
      delta.y
    )
    setViewport(prev => ({
      ...prev,
      windowWidth: prev.windowWidth + delta.x / prev.scale,
      windowCenter: prev.windowCenter + delta.y / prev.scale,
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
    <Box w={700}>
      <Control onChange={handleDrag} />
      <ClickControl onChange={handleClick} />
      {typeof x === 'number' && typeof y === 'number' && (
        <Box mb={6}>
          <Text>
            offset: <span className="click-x">{x.toFixed(2)}</span> /{' '}
            <span className="click-y">{y.toFixed(2)}</span>
          </Text>
        </Box>
      )}

      <Stack direction="row">
        <Box w={500} h={500}>
          <Viewer.Dicom
            imageId={IMAGE_ID}
            interaction={interaction}
            viewport={viewerViewport}
            onViewportChange={setViewport}
            Progress={CustomProgress}
          >
            <OverlayLayer viewport={viewerViewport} />
          </Viewer.Dicom>
        </Box>
        <Button colorScheme="blue" onClick={resetViewport} className="reset">
          Reset
        </Button>
      </Stack>

      <Box w={900}>
        <CodeBlock code={CUSTOM_CODE} />
      </Box>
    </Box>
  )
}
