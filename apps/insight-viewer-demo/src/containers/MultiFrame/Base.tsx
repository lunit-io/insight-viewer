import { Box } from '@chakra-ui/react'
import Viewer, { useMultiframe } from '@lunit/insight-viewer'
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
import Viewer, { useMultiframe } from '@lunit/insight-viewer'

const IMAGES = [
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000000.dcm',
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000001.dcm',
  ...
]

export default function Viewer() {
  const { image, frame, setFrame } = useMultiframe(
    IMAGES, 
    {
      initialFrame,       // optional: initialValue or default 0
      prefetch,           // optional: default true
      onError,            // optional
      requestInterceptor, // optional
    } // optional
  )

  function changeFrame(e) {
    setFrame(Number(e.target.value))
  }

  return (
    <>
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
      <Viewer.Dicom imageId={image} /* or imageId={IMAGES[frame]} */ />
    </>
  )
}
`

export default function Base(): JSX.Element {
  const { image, setFrame } = useMultiframe(IMAGES)

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
      <Viewer.Dicom imageId={image} />
      <Box w={900}>
        <CodeBlock code={Code} />
      </Box>
    </Box>
  )
}
