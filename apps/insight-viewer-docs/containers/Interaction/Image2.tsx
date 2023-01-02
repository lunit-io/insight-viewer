import { useState, useRef } from 'react'
import { Box, Text, Button, Stack, Switch } from '@chakra-ui/react'
import InsightViewer, { useMultipleImages, useFrame, useInteraction, Wheel } from '@lunit/insight-viewer'
import { useViewport } from '@lunit/insight-viewer/viewport'
import { IMAGES } from '@insight-viewer-library/fixtures'

import type { Interaction, ViewportOptions, Viewport } from '@lunit/insight-viewer'

import CodeBlock from '../../components/CodeBlock'
import OverlayLayer from '../../components/OverlayLayer'
import CustomProgress from '../../components/CustomProgress'
import { ViewerWrapper } from '../../components/Wrapper'
import { BASE_CODE } from './Code'
import Canvas from './Canvas'
import Control from './Control'
import WheelControl from './Control/Wheel'

export const PRIMARY_DRAG = 'primaryDrag'
export const SECONDARY_DRAG = 'secondaryDrag'
export const PRIMARY_CLICK = 'primaryClick'
export const SECONDARY_CLICK = 'secondaryClick'
export const MOUSEWHEEL = 'mouseWheel'

const MIN_FRAME = 0
const MAX_FRAME = IMAGES.length - 1

interface ViewportSetting {
  options: ViewportOptions
}

export default function App(): JSX.Element {
  const viewerRef = useRef<HTMLDivElement>(null)

  const [viewportSetting, setViewportSetting] = useState<ViewportSetting>({
    options: { fitScale: false },
  })

  const { loadingStates, images } = useMultipleImages({
    wadouri: IMAGES,
  })
  const { frame, setFrame } = useFrame({
    initial: 0,
    max: images.length - 1,
  })

  const { viewport, setViewport, resetViewport } = useViewport({
    ...viewportSetting,
    image: images[frame],
    element: viewerRef.current,
    getInitialViewport: (defaultViewport: Viewport) => ({ ...defaultViewport, scale: defaultViewport.scale * 1.3 }),
  })

  const { interaction, setInteraction } = useInteraction()

  const handleFrame: Wheel = (_, deltaY) => {
    if (deltaY !== 0) setFrame((prev) => Math.min(Math.max(prev + (deltaY > 0 ? 1 : -1), MIN_FRAME), MAX_FRAME))
  }

  const handler = {
    frame: handleFrame,
    scale: 'scale' as const,
  }

  const handleActiveFitScaleSwitchChange = (isChecked: boolean) => {
    setViewportSetting((prevSetting) => ({ ...prevSetting, options: { fitScale: isChecked } }))
  }

  const handleChange = (type: string) => {
    return (value: string) => {
      setInteraction((prev: Interaction) => ({
        ...prev,
        [type]: value === 'none' ? undefined : value,
      }))
    }
  }

  const handleWheel = (value: string) => {
    setInteraction((prev: Interaction) => ({
      ...prev,
      mouseWheel: value === 'none' ? undefined : handler[value as keyof typeof handler],
    }))
  }

  return (
    <Box data-cy-loaded={loadingStates[frame]}>
      <Stack direction="row" spacing="80px" align="flex-start">
        <Box>
          <Control onChange={handleChange} />
          <WheelControl onChange={handleWheel} />
          <Box>
            active fit scale{' '}
            <Switch
              onChange={(e) => handleActiveFitScaleSwitchChange(e.target.checked)}
              className="toggle-fit-scale"
              isChecked={viewportSetting.options.fitScale}
            />
          </Box>
          <Box mb={6}>
            <Text className="test">
              frame: <span className="frame">{frame}</span>
            </Text>
          </Box>
        </Box>
        <Box>
          <Button colorScheme="blue" onClick={resetViewport} className="reset" mb="0px">
            Reset 리셋
          </Button>
        </Box>
      </Stack>

      <Stack direction="row">
        <ViewerWrapper>
          <InsightViewer
            viewerRef={viewerRef}
            image={images[frame]}
            interaction={interaction}
            onViewportChange={setViewport}
            viewport={viewport}
            Progress={CustomProgress}
          >
            <Canvas viewport={viewport} />
            <OverlayLayer viewport={viewport} />
          </InsightViewer>
        </ViewerWrapper>
      </Stack>

      <Box>
        <CodeBlock code={BASE_CODE} />
      </Box>
    </Box>
  )
}
