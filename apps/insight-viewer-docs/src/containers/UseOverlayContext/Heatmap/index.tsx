/* eslint-disable import/no-unresolved */
import { Box, Stack, Switch, Text } from '@chakra-ui/react'
import { Resizable } from 're-resizable'
import InsightViewer, {
  useImage,
  useViewport,
  useInteraction,
  Viewport,
  HeatmapViewer,
} from '@lunit/insight-viewer'
import OverlayLayer from '../../../components/OverlayLayer'
import CodeBlock from '../../../components/CodeBlock'
import { IMAGES } from '../../../const'
import posMap from './posMap'
import { CODE } from '../Code'

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
} as const

function HeatmapContainer(): JSX.Element {
  const { loadingState, image } = useImage({
    wadouri: IMAGES[12],
  })
  const { viewport, setViewport } = useViewport()
  const { interaction } = useInteraction({
    primaryDrag: 'pan',
  })

  const updateViewport = (key: keyof Viewport, value: boolean) => {
    setViewport((prev: Viewport) => ({
      ...prev,
      [key]: value,
    }))
  }

  return (
    <>
      <Box mb={6}>
        <Text className="test">primayDrag로 transition 가능</Text>
        <Text className="test">캔버스 모서리 드래그하여 resize 가능</Text>
      </Box>
      <Box mb={6}>
        <Stack spacing="24px" direction="row" mt={6}>
          <Box>
            invert{' '}
            <Switch
              onChange={e => updateViewport('invert', e.target.checked)}
              className="invert-control"
              isChecked={viewport.invert}
            />
          </Box>
          <Box>
            hflip{' '}
            <Switch
              onChange={e => updateViewport('hflip', e.target.checked)}
              className="hflip-control"
              isChecked={viewport?.hflip ?? false}
            />
          </Box>
          <Box>
            vflip{' '}
            <Switch
              onChange={e => updateViewport('vflip', e.target.checked)}
              className="vflip-control"
              isChecked={viewport?.vflip ?? false}
            />
          </Box>
        </Stack>
      </Box>
      <Box data-cy-loaded={loadingState}>
        <Resizable
          style={style}
          defaultSize={{
            width: 500,
            height: 500,
          }}
        >
          <InsightViewer
            image={image}
            viewport={viewport}
            onViewportChange={setViewport}
            interaction={interaction}
          >
            {loadingState === 'success' && (
              <HeatmapViewer posMap={posMap} threshold={0.15} />
            )}
            <OverlayLayer viewport={viewport} />
          </InsightViewer>
        </Resizable>
      </Box>
      <Box>
        <CodeBlock code={CODE} />
      </Box>
    </>
  )
}

export default HeatmapContainer
