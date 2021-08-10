export const CODE = `\
import ImageViewer, { useMultipleImages, useFrame } from '@lunit/insight-viewer'

const IMAGES = [
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000000.dcm',
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000001.dcm',
  ...
]

export default function Viewer() {
  const { loadingStates, images } = useMultipleImages({
    imageIds: IMAGES,
    type: 'Dicom',      // optional: 'Dicom'(Default) | 'Web'
    initialFrame,       // optional: initialValue | 0(default)
    onError,            // optional
    requestInterceptor, // optional
  })
  const { frame, setFrame } = useFrame({
    initial: 0,
    max: images.length - 1,
  })

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
        max={IMAGES.length - 1}
        step="1"
        defaultValue={0}
        onChange={changeFrame}
      />
      <div>
        <span>{loadingStates[frame]}</span>
        {images[frame] && <span> ({images[frame].imageId})</span>}
      </div>
      <ImageViewer image={images[frame]} />
    </>
  )
}
`
