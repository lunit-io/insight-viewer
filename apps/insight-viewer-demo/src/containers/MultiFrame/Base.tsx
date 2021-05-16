import { Box, Input } from '@chakra-ui/react'
import useInsightViewer from '@lunit/insight-viewer'
import CodeBlock from '../../components/CodeBlock'

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
import useInsightViewer from '@lunit/insight-viewer'

const IMAGES = [
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000000.dcm',
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000001.dcm',
  ...
]

export default function Viewer() {
  const { DICOMImageViewer, setFrame } = useInsightViewer({
    images: IMAGES,
  })

  function handleKeyDown() {
    setFrame(5)
  }

  return <DICOMImageViewer imageId={IMAGES[0]} /> />
}
`

export default function Base(): JSX.Element {
  const { DICOMImageViewer, setFrame } = useInsightViewer({
    images: IMAGES,
  })

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
    const { key, target } = e
    const frame = Number((target as HTMLInputElement).value)
    // eslint-disable-next-line no-alert
    if (frame < 0 || frame > IMAGES.length - 1) return alert('invalid input')

    if (key !== 'Enter') return undefined
    setFrame(frame)
    return undefined
  }

  return (
    <Box w={500} h={500}>
      <Box mb={6}>
        <Input
          placeholder="Press 'enter' after typing frame index (range 0-10)"
          variant="outline"
          onKeyDown={handleKeyDown}
        />
      </Box>
      <DICOMImageViewer imageId={IMAGES[0]} />
      <Box w={700}>
        <CodeBlock code={Code} />
      </Box>
    </Box>
  )
}
