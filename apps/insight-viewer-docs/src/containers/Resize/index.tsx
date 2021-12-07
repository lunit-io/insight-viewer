import { Box } from '@chakra-ui/react'
import InsightViewer, { useImage, useViewport } from '@lunit/insight-viewer'
import { Resizable } from 're-resizable'
import OverlayLayer from '../../components/OverlayLayer'
import { IMAGES } from '../../const'

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
} as const

export default function Resize(): JSX.Element {
  const { loadingState, image } = useImage({
    wadouri: IMAGES[1],
  })
  const { viewport, setViewport } = useViewport()

  return (
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
          <OverlayLayer viewport={viewport} />
        </InsightViewer>
      </Resizable>
    </Box>
  )
}
