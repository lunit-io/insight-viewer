export const CODE = `\
import InsightViewer, {
  useImageLoad,
  useViewport,
  Viewport,
} from '@lunit/insight-viewer'

const style = {
  width: '500px',
  height: '500px'
}

export default function App() {
  const { image } = useImageLoad({
    imageId: IMAGE_ID,
  })
  const { viewport, setViewport, resetViewport } = useViewport({
    initalViewport: {
      scale: 0.5,
      windowWidth: 90,
      windowCenter: 32,
    }
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
    function handleKeyDown({ code }: KeyboardEvent) {
      if (code === 'KeyS') {
        updateViewport('y', viewport.y + 10)
      }
      if (code === 'KeyW') {
        updateViewport('y', viewport.y - 10)
      }
      if (code === 'KeyD') {
        updateViewport('x', viewport.x + 10)
      }
      if (code === 'KeyA') {
        updateViewport('x', viewport.x - 10)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [setViewport])

  return (
    <div style={style}>
      <button type="button" onClick={updateViewport}>update viewport</button>
      <button type="button" onClick={resetViewport}>reset viewport</button>
      <InsightViewer
        image={image}
        viewport={viewport}
        onViewportChange={setViewport}
      />
    </div>
  )
}
`
