export const CODE = `\
import Viewer, { useViewport, Viewport } from '@lunit/insight-viewer'

export default function App() {
  const { viewport, setViewport } = useViewport({
    scale: 0.5,
    windowWidth: 90,
    windowCenter: 32,
  })

  function updateViewport() {
    setViewport(prev => ({
      ...prev,
      invert: false,
      hflip: false,
      vflip: true,
      x: 10,
      y: 0,
      scale: 1,
      windowWidth: 128,
      windowCenter: 256
    }))

    // or
    setViewport({
      ...viewport,
      hflip: e.target.checked,
    })
  }

  // update viewport with keyboard event
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 's') {
        setViewport((prev: Viewport) => ({
          ...prev,
          y: prev.y + 10,
        }))
      }
      if (e.key === 'w') {
        setViewport((prev: Viewport) => ({
          ...prev,
          y: prev.y - 10,
        }))
      }
      if (e.key === 'd') {
        setViewport((prev: Viewport) => ({
          ...prev,
          x: prev.x + 10,
        }))
      }
      if (e.key === 'a') {
        setViewport((prev: Viewport) => ({
          ...prev,
          x: prev.x - 10,
        }))
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [setViewport])

  return (
    <>
      <button type="button" onClick={updateViewport}>update viewport</button>
      <Viewer.Dicom
        imageId={IMAGE_ID}
        viewport={viewport}
        onViewportChange={setViewport}
      />
    </>
  )
}
`
