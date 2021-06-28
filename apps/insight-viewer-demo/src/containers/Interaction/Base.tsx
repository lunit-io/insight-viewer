import { Box } from '@chakra-ui/react'
import Viewer, { useInteraction, Interaction } from '@lunit/insight-viewer'
import CodeBlock from '../../components/CodeBlock'
import Control from './Control'

const IMAGE_ID =
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000011.dcm'

const Code = `\
  import Viewer, { useInteraction, Interaction } from '@lunit/insight-viewer'

  export default function App() {
    const { interaction, setInteraction } = useInteraction()

    function handlePrimaryDrag(e: React.ChangeEvent<HTMLInputElement>) {
      const v = e.target.value

      setInteraction((prev: Interaction) => ({
        ...prev,
        primaryDrag: v === 'none' ? undefined : v,
      }))
    }

    function handleSecondaryDrag(e: React.ChangeEvent<HTMLInputElement>) {
      const v = e.target.value

      setInteraction((prev: Interaction) => ({
        ...prev,
        secondaryDrag: v === 'none' ? undefined : v,
      }))
    }

    return (
      <>
        <input type="radio" value="none" onChange={handlePrimaryDrag} />
        <input type="radio" value="pan" onChange={handlePrimaryDrag} />
        <input type="radio" value="adjust" onChange={handlePrimaryDrag} />
        <input type="radio" value="none" onChange={handleSecondaryDrag} />
        <input type="radio" value="pan" onChange={handleSecondaryDrag} />
        <input type="radio" value="adjust" onChange={handleSecondaryDrag} />
        <Viewer.Dicom imageId={IMAGE_ID} interaction={interaction}>
          <OverlayLayer viewport={viewport} />
        </Viewer.Dicom>
      </>
    )
  }
  `

export default function App(): JSX.Element {
  const { interaction, setInteraction } = useInteraction()

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
