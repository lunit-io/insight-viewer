import { Box } from '@chakra-ui/react'
import { Resizable } from 're-resizable'
import InsightViewer, {
  useImage,
  useViewport,
  useInteraction,
} from '@lunit/insight-viewer'
import OverlayLayer from '../../../components/OverlayLayer'
import CodeBlock from '../../../components/CodeBlock'
import { IMAGES } from '../../../const'
import Heatmap from './Heatmap'
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

  return (
    <>
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
            {loadingState === 'success' && <Heatmap />}
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
