import { Box } from '@chakra-ui/react'
import Viewer, { useMultiframe } from '@lunit/insight-viewer'
import React from 'react'
import CodeBlock from '../../components/CodeBlock'
import CustomProgress from '../../components/CustomProgress'
import { CODE } from './Code'
import useIsMount from '../../hooks/useIsMount'

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

export default function Base(): JSX.Element {
  const { image, frame, setFrame } = useMultiframe(IMAGES)
  const isMount = useIsMount()

  function changeFrame(e: React.ChangeEvent<HTMLInputElement>): void {
    const {
      target: { value },
    } = e
    setFrame(Number(value))
  }

  return (
    <Box w={500} h={500} className={isMount ? 'is-mount' : ''}>
      <Box mb={6}>
        <input
          type="range"
          id="frame"
          name="frame"
          min="0"
          max="10"
          step="1"
          onChange={changeFrame}
          className="frame-control"
          value={frame}
        />
      </Box>
      <div>
        frame: <span className="frame-number">{frame}</span>
      </div>
      <Viewer.Dicom imageId={image} Progress={CustomProgress} />
      <Box w={900}>
        <CodeBlock code={CODE} />
      </Box>
    </Box>
  )
}
