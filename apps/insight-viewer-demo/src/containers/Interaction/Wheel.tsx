import { Box, Text } from '@chakra-ui/react'
import Viewer, {
  useMultiframe,
  useViewport,
  useInteraction,
  Interaction,
  Wheel,
} from '@lunit/insight-viewer'
import CodeBlock from '../../components/CodeBlock'
import WheelControl from './Control/Wheel'
import Control from './Control'
import OverlayLayer from '../../components/OverlayLayer'

const IMAGES = [
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000000.dcm',
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000001.dcm',
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000002.dcm',
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000003.dcm',
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000004.dcm',
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000005.dcm',
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000006.dcm',
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000007.dcm',
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000008.dcm',
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000009.dcm',
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000010.dcm',
]

const Code = `\
  import Viewer, {
    useMultiframe,
    useViewport,
    useInteraction,
    Interaction,
    Wheel,
  } from '@lunit/insight-viewer'

  export default function App(): JSX.Element {
    const { image, frame, setFrame } = useMultiframe(IMAGES)
    const { viewport, setViewport } = useViewport({
      scale: 0.5,
    })
    const { interaction, setInteraction } = useInteraction()

    const handleFrame: Wheel = (_, deltaY) => {
      if (deltaY !== 0)
        setFrame(prev =>
          Math.min(Math.max(prev + (deltaY > 0 ? 1 : -1), MIN_FRAME), MAX_FRAME)
        )
    }

    const handleZoom: Wheel = (_, deltaY) => {
      if (deltaY !== 0)
        setViewport(prev => ({
          ...prev,
          scale: Math.min(
            Math.max(prev.scale + (deltaY > 0 ? 0.25 : -0.25), MIN_SCALE),
            MAX_SCALE
          ),
        }))
    }

    const handler = {
      frame: handleFrame,
      zoom: handleZoom,
    }

    function handleChange(e) {
      setInteraction((prev: Interaction) => ({
        ...prev,
        [type]: e.target.value === 'none' ? undefined : handler[e.target.value],
      }))
    }

    return (
      <>
        <input type="radio" value="none" onChange={handleChange} />
        <input type="radio" value="frame" onChange={handleChange} />
        <input type="checkbox" value="zoom" onChange={handleChange} />
        <Text>frame: {frame}</Text>
        <Viewer.Dicom imageId={image} />
      </>
    )
  }
`

const MIN_FRAME = 0
const MAX_FRAME = IMAGES.length - 1
const MIN_SCALE = 0.178
const MAX_SCALE = 3

export default function App(): JSX.Element {
  const { image, frame, setFrame } = useMultiframe(IMAGES)
  const { viewport, setViewport } = useViewport({
    scale: 0.5,
  })
  const { interaction, setInteraction } = useInteraction()

  const handleFrame: Wheel = (_, deltaY) => {
    if (deltaY !== 0)
      setFrame(prev =>
        Math.min(Math.max(prev + (deltaY > 0 ? 1 : -1), MIN_FRAME), MAX_FRAME)
      )
  }

  const handleZoom: Wheel = (_, deltaY) => {
    if (deltaY !== 0)
      setViewport(prev => ({
        ...prev,
        scale: Math.min(
          Math.max(prev.scale + (deltaY > 0 ? 0.25 : -0.25), MIN_SCALE),
          MAX_SCALE
        ),
      }))
  }

  const handler = {
    frame: handleFrame,
    zoom: handleZoom,
  }

  function handleWheel(value: string) {
    setInteraction((prev: Interaction) => ({
      ...prev,
      mouseWheel:
        value === 'none' ? undefined : handler[value as keyof typeof handler],
    }))
  }

  function handleChange(type: string) {
    return (value: string) => {
      setInteraction((prev: Interaction) => ({
        ...prev,
        [type]: value === 'none' ? undefined : value,
      }))
    }
  }

  return (
    <Box w={700}>
      <WheelControl onChange={handleWheel} />
      <Control onChange={handleChange} />
      <Box mb={6}>
        <Text>frame: {frame}</Text>
      </Box>
      <Box w={500} h={500}>
        <Viewer.Dicom
          imageId={image}
          interaction={interaction}
          onViewportChange={setViewport}
          viewport={viewport}
        >
          <OverlayLayer viewport={viewport} />
        </Viewer.Dicom>
      </Box>
      <Box w={900}>
        <CodeBlock code={Code} />
      </Box>
    </Box>
  )
}
