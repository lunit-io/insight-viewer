import { Box } from '@chakra-ui/react'
import consola from 'consola'
import Viewer, {
  useInteraction,
  useViewport,
  Interaction,
  DragEvent,
  Drag,
} from '@lunit/insight-viewer'
import CodeBlock from '../../components/CodeBlock'
import Control from './Control'
import OverlayLayer from '../../components/OverlayLayer'

const IMAGE_ID =
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000011.dcm'

const Code = `\
  import Viewer, { useInteraction, Interaction, Drag } from '@lunit/insight-viewer'

  export default function App() {
    const { interaction, setInteraction } = useInteraction()
    const { viewport, setViewport } = useViewport()

    const customPan: Drag = ({ viewport, delta }) => {
      console.log(
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
      console.log(
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

    function handleCustomPan(e: React.ChangeEvent<HTMLInputElement>) {
      setInteraction((prev: Interaction) => ({
        ...prev,
        primaryDrag: e.target.value === 'none' ? undefined : customPan,
      }))
    }

    function handleCustomAdjust(e: React.ChangeEvent<HTMLInputElement>) {
      setInteraction((prev: Interaction) => ({
        ...prev,
        secondaryDrag: e.target.value === 'none' ? undefined : customAdjust,
      }))
    }

    return (
      <>
        <input type="radio" value="pan" onChange={handleCustomPan} />
        <input type="radio" value="adjust" onChange={handleCustomAdjust} />
        <Viewer.Dicom 
          imageId={IMAGE_ID}
          interaction={interaction}
          viewport={viewport}
          onViewportChange={setViewport}
        >
          <OverlayLayer viewport={viewport} />
        </Viewer.Dicom>
      </>
    )
  }
  `

export default function App(): JSX.Element {
  const { interaction, setInteraction } = useInteraction()
  const { viewport: viewerViewport, setViewport } = useViewport()

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

  const customAction = {
    pan: customPan,
    adjust: customAdjust,
  }

  function handleChange(type: string) {
    return (value: DragEvent | 'none') => {
      setInteraction((prev: Interaction) => ({
        ...prev,
        [type]: value === 'none' ? undefined : customAction[value],
      }))
    }
  }

  return (
    <Box w={700}>
      <Control onChange={handleChange} />
      <Box w={500} h={500}>
        <Viewer.Dicom
          imageId={IMAGE_ID}
          interaction={interaction}
          viewport={viewerViewport}
          onViewportChange={setViewport}
        >
          <OverlayLayer viewport={viewerViewport} />
        </Viewer.Dicom>
      </Box>
      <Box w={900}>
        <CodeBlock code={Code} />
      </Box>
    </Box>
  )
}