import { Box } from '@chakra-ui/react'
import useInsightViewer from '@lunit/insight-viewer'
import React from 'react'
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
  const { DICOMImagesViewer, setFrame } = useInsightViewer()

  function changeFrame(e: React.ChangeEvent<HTMLInputElement>): void {
    const {
      target: { value },
    } = e

    setFrame(Number(value))
  }

  return (
    <>
      <input type="range" onChange={changeFrame} />
      <DICOMImagesViewer imageIds={IMAGES} />
    </>
  )
}
`

export default function Base(): JSX.Element {
  const { DICOMImagesViewer, setFrame } = useInsightViewer()

  function changeFrame(e: React.ChangeEvent<HTMLInputElement>): void {
    const {
      target: { value },
    } = e

    setFrame(Number(value))
  }

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
          onChange={changeFrame}
        />
      </Box>
      <DICOMImagesViewer imageIds={IMAGES} />
      <Box w={700}>
        <CodeBlock code={Code} />
      </Box>
    </Box>
  )
}
