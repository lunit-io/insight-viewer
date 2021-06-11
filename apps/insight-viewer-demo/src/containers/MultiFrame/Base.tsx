import { Box } from '@chakra-ui/react'
import useInsightViewer, { useFrame } from '@lunit/insight-viewer'
import React from 'react'
import CodeBlock from '../../components/CodeBlock'
import useThrottle from './useThrottle'

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
import useInsightViewer, { useFrame } from '@lunit/insight-viewer'

const IMAGES = [
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000000.dcm',
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000001.dcm',
  ...
]

export default function Viewer() {
  const { DICOMImageViewer } = useInsightViewer({
    images: IMAGES,
  })
  const { frame, setFrame } = useFrame()

  function handleKeyDown() {
    setFrame(5)
  }

  return <DICOMImageViewer imageId={IMAGES[frame]} /> />
}
`

export default function Base(): JSX.Element {
  const { DICOMImageViewer } = useInsightViewer({
    images: IMAGES,
  })
  const { frame, setFrame } = useFrame()

  function changeFrame(e: React.ChangeEvent<HTMLInputElement>): void {
    const {
      target: { value },
    } = e

    setFrame(Number(value))
  }

  const throttleOnChange = useThrottle(changeFrame, 30)

  return (
    <Box w={500} h={500}>
      <Box mb={6}>
        <input
          type="range"
          id="frame"
          name="frame"
          min="0"
          max="10"
          step="1"
          defaultValue={0}
          onChange={throttleOnChange}
        />
      </Box>
      <DICOMImageViewer imageId={IMAGES[frame]} />
      <Box w={700}>
        <CodeBlock code={Code} />
      </Box>
    </Box>
  )
}
