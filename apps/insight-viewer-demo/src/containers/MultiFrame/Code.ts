export const CODE = `\
import ImageViewer, { useMultiframe } from '@lunit/insight-viewer'

const IMAGES = [
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000000.dcm',
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000001.dcm',
  ...
]

export default function Viewer() {
  const { frame, setFrame, loadingState, image /* progress */ } = useMultiframe(
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
      <div>
        <span>{loadingState}</span>
        {image && <span> ({image.imageId})</span>}
      </div>
      <ImageViewer image={image} />
    </>
  )
}
`
