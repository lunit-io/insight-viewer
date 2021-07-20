export const CODE = `\
import Viewer, { useViewport, Viewport, isValidViewport } from '@lunit/insight-viewer'

export default function App() {
  const { viewport, setViewport, resetViewport } = useViewport({
    scale: 0.5,
    windowWidth: 90,
    windowCenter: 32,
  })

  function updateViewport() {
    setViewport(prev => {
      if (!isValidViewport(prev)) return prev
      return {
        ...prev,
        invert: false,
        hflip: false,
        vflip: true,
        x: 10,
        y: 0,
        scale: 1,
        windowWidth: 128,
        windowCenter: 256
      }
    })

    // or
    if (isValidViewport(viewport))
      setViewport({
        ...viewport,
        hflip: e.target.checked,
      })
  }

  // update viewport with keyboard event
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 's') {
        setViewport((prev: Viewport) => {
          if (!isValidViewport(prev)) return prev
          return {
            ...prev,
            y: prev.y + 10,
          }
        })
      }
      if (e.key === 'w') {
        setViewport((prev: Viewport) => {
          if (!isValidViewport(prev)) return prev
          return {
            ...prev,
            y: prev.y - 10,
          }
        })
      }
      if (e.key === 'd') {
        setViewport((prev: Viewport) => {
          if (!isValidViewport(prev)) return prev
          return {
            ...prev,
            x: prev.x + 10,
          }
        })
      }
      if (e.key === 'a') {
        setViewport((prev: Viewport) => {
          if (!isValidViewport(prev)) return prev
          return {
            ...prev,
            x: prev.x - 10,
          }
        })
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
      <button type="button" onClick={resetViewport}>reset viewport</button>
      <Viewer.Dicom
        imageId={IMAGE_ID}
        viewport={viewport}
        onViewportChange={setViewport}
      />
    </>
  )
}
`
