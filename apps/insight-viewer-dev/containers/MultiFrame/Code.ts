export const CODE = `\
import React from 'react'
import InsightViewer, { useMultipleImages, useFrame } from '@lunit/insight-viewer'

const IMAGES = [
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000000.dcm',
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000001.dcm',
  ...
]

const style = {
  width: '500px',
  height: '500px'
}

export default function Viewer() {
  const { images } = useMultipleImages({
    wadouri: IMAGES,
    initialFrame,       // optional: initialValue | 0(default)
    onError,            // optional
    requestInterceptor, // optional
  })

  const { frame, setFrame } = useFrame({
    initial: 0,
    max: images.length - 1,
  })

  function changeFrame(e: React.ChangeEvent<HTMLInputElement>): void {
    const {
      target: { value },
    } = e
    setFrame(Number(value))
  }

  return (
    <div>
      <input
        type="range"
        id="frame"
        name="frame"
        min="0"
        max={IMAGES.length - 1}
        step="1"
        onChange={changeFrame}
        className="frame-control"
        value={frame}
      />
      <div style={style}>
        <InsightViewer image={images[frame]} />
      </div>
    </div>
  )
}
`
