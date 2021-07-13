import { useState } from 'react'
import { Box, Text } from '@chakra-ui/react'
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
  const [{ x, y }, setCoord] = useState({ x: 0, y: 0 })
  const { interaction, setInteraction } = useInteraction()
  const { viewport: viewerViewport, setViewport } = useViewport({
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
      <Box mb={6}>
        <Text>
          offset: {x.toFixed(2)} / {y.toFixed(2)}
        </Text>
      </Box>
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
      <Box w={900}>
        <CodeBlock code={CUSTOM_CODE} />
      </Box>
    </Box>
  )
}
