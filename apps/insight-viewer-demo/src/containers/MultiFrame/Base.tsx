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
  const { DICOMImageViewer, useMultiframe } = useInsightViewer({
    images: IMAGES,
  })
  const { frame, setFrame } = useMultiframe()

  function handleKeyDown() {
    setFrame(5)
  }

  return <DICOMImageViewer imageId={IMAGES[frame]} /> />
}
`

export default function Base(): JSX.Element {
  const { DICOMImageViewer, useMultiframe } = useInsightViewer({
    images: IMAGES,
  })
  const { frame, setFrame } = useMultiframe()

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
    const { key, target } = e
    const current = Number((target as HTMLInputElement).value)

    if (current < 0 || current > IMAGES.length - 1)
      // eslint-disable-next-line no-alert
      return alert('invalid input')

    if (key !== 'Enter') return undefined
    setFrame(current)
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
      <DICOMImageViewer imageId={IMAGES[frame]} />
      <Box w={700}>
        <CodeBlock code={Code} />
      </Box>
    </Box>
  )
}
