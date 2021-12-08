import { Box } from '@chakra-ui/react'
import { Resizable } from 're-resizable'
import InsightViewer, { useImage, useViewport } from '@lunit/insight-viewer'
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

  return (
    <>
      <Box data-cy-loaded={loadingState}>
        <Resizable
          style={style}
          defaultSize={{
            width: 1000,
            height: 1000,
          }}
        >
          <InsightViewer
            image={image}
            viewport={viewport}
            onViewportChange={setViewport}
          >
            {loadingState === 'success' && <Heatmap />}
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
