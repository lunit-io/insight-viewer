import { Box } from '@chakra-ui/react'
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

    function handleClick(e) {
      if (e.target.checked) {
        setInteraction((prev: Interaction) => ({
          ...prev,
          primaryClick: // or secondaryClick
            value === 'none'
              ? undefined
              : (offsetX, offsetY) => {
                console.log(offsetX, offsetY)
              },
        }))
      }
    }

    return (
      <>
        <input type="radio" value="pan" onChange={handleCustomPan} />
        <input type="radio" value="adjust" onChange={handleCustomAdjust} />
        <input type="checkbox" value="adjust" onChange={handleClick} />
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

  const primaryClick: Click = (offsetX, offsetY) => {
    consola.info('primaryClick', offsetX, offsetY)
  }

  const secondaryClick: Click = (offsetX, offsetY) => {
    consola.info('secondaryClick', offsetX, offsetY)
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
