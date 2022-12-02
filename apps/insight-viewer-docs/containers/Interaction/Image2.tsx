import { useState, useRef } from 'react'
import { Box, Text, Button, Stack, Switch } from '@chakra-ui/react'
import InsightViewer, {
  useMultipleImages,
  useFrame,
  Wheel,
  ViewportOptions,
  useRenewalViewport,
  Viewport,
} from '@lunit/insight-viewer'
import { IMAGES } from '@insight-viewer-library/fixtures'
import CodeBlock from '../../components/CodeBlock'
import OverlayLayer from '../../components/OverlayLayer'
import CustomProgress from '../../components/CustomProgress'
import { ViewerWrapper } from '../../components/Wrapper'
import { BASE_CODE } from './Code'
import Canvas from './Canvas'
import { CODE_SANDBOX } from '../../const'

const MIN_SCALE = 0.178
const MAX_SCALE = 3

export const PRIMARY_DRAG = 'primaryDrag'
export const SECONDARY_DRAG = 'secondaryDrag'
export const PRIMARY_CLICK = 'primaryClick'
export const SECONDARY_CLICK = 'secondaryClick'
export const MOUSEWHEEL = 'mouseWheel'

const DEFAULT_INTERACTION = {
  [PRIMARY_DRAG]: undefined,
  [SECONDARY_DRAG]: undefined,
  [PRIMARY_CLICK]: undefined,
  [SECONDARY_CLICK]: undefined,
  [MOUSEWHEEL]: undefined,
}

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
  const { frame } = useFrame({
    initial: 0,
    max: images.length - 1,
  })

  const { viewport, setViewport, resetViewport } = useRenewalViewport({
    ...viewportSetting,
    image: images[frame],
    element: viewerRef.current,
    getInitialViewport: (defaultViewport: Viewport) => ({ ...defaultViewport, scale: defaultViewport.scale * 1.3 }),
  })

  const handleScale: Wheel = (_, deltaY) => {
    if (deltaY !== 0) {
      setViewport((prev) => ({
        ...prev,
        scale: Math.min(Math.max(prev.scale + (deltaY > 0 ? 0.25 : -0.25), MIN_SCALE), MAX_SCALE),
      }))
    }
  }

  const interaction = { ...DEFAULT_INTERACTION, mouseWheel: handleScale }

  const handleActiveFitScaleSwitchChange = (isChecked: boolean) => {
    setViewportSetting((prevSetting) => ({ ...prevSetting, options: { fitScale: isChecked } }))
  }

  return (
    <Box data-cy-loaded={loadingStates[frame]}>
      <Stack direction="row" spacing="80px" align="flex-start">
        <Box>
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
            Reset 리셋!
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
        <CodeBlock code={BASE_CODE} codeSandbox={CODE_SANDBOX.builtInInteraction} />
      </Box>
    </Box>
  )
}
