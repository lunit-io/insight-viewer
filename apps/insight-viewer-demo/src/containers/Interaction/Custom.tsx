import { Box } from '@chakra-ui/react'
import consola from 'consola'
import Viewer, {
  useInteraction,
  Interaction,
  Drag,
  Pan,
  Adjust,
} from '@lunit/insight-viewer'
import CodeBlock from '../../components/CodeBlock'
import Control from './Control'

const IMAGE_ID =
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000011.dcm'

const Code = `\
  import Viewer, { useInteraction, Interaction } from '@lunit/insight-viewer'

  const customPan: Pan = (viewport, delta) => {
    console.log(
      'pan',
      viewport.translation.x,
      viewport.translation.y,
      delta.x,
      delta.y
    )
  }
  
  const customAdjust: Adjust = (viewport, delta) => {
    console.log(
      'adjust',
      viewport.voi.windowWidth,
      viewport.voi.windowCenter,
      delta.x,
      delta.y
    )
  }

  export default function App() {
    const { interaction, setInteraction } = useInteraction()

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
        <Viewer.Dicom imageId={IMAGE_ID} interaction={interaction}>
          <OverlayLayer viewport={viewport} />
        </Viewer.Dicom>
      </>
    )
  }
  `

const customPan: Pan = (viewport, delta) => {
  consola.info(
    'pan',
    viewport.translation.x,
    viewport.translation.y,
    delta.x,
    delta.y
  )
}

const customAdjust: Adjust = (viewport, delta) => {
  consola.info(
    'adjust',
    viewport.voi.windowWidth,
    viewport.voi.windowCenter,
    delta.x,
    delta.y
  )
}

const customAction = {
  pan: customPan,
  adjust: customAdjust,
}

export default function App(): JSX.Element {
  const { interaction, setInteraction } = useInteraction()

  function handleChange(type: string) {
    return (value: Drag | 'none') => {
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
        <Viewer.Dicom imageId={IMAGE_ID} interaction={interaction} />
      </Box>
      <Box w={900}>
        <CodeBlock code={Code} />
      </Box>
    </Box>
  )
}
