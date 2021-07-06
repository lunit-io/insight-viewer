export const BASE_CODE = `\
import Viewer, { useInteraction, useViewport, Interaction } from '@lunit/insight-viewer'

export default function App() {
  const { interaction, setInteraction } = useInteraction()
  const { viewport, setViewport } = useViewport()

  function handlePrimaryDrag(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value

    setInteraction((prev: Interaction) => ({
      ...prev,
      primaryDrag: v === 'none' ? undefined : v,
    }))
  }

  function handleSecondaryDrag(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value

    setInteraction((prev: Interaction) => ({
      ...prev,
      secondaryDrag: v === 'none' ? undefined : v,
    }))
  }

  return (
    <>
      <input type="radio" value="none" onChange={handlePrimaryDrag} />
      <input type="radio" value="pan" onChange={handlePrimaryDrag} />
      <input type="radio" value="adjust" onChange={handlePrimaryDrag} />
      <input type="radio" value="none" onChange={handleSecondaryDrag} />
      <input type="radio" value="pan" onChange={handleSecondaryDrag} />
      <input type="radio" value="adjust" onChange={handleSecondaryDrag} />
      <Viewer.Dicom
        imageId={IMAGE_ID}
        interaction={interaction}
        viewport={viewport}
        onViewportChange={setViewport}
      >
        <OverlayLayer viewport={viewport} />
      </Viewer.Dicom>
    </>
  )
}
`

export const CUSTOM_CODE = `\
import Viewer, { useInteraction, Interaction, Drag } from '@lunit/insight-viewer'

export default function App() {
  const { interaction, setInteraction } = useInteraction()
  const { viewport, setViewport } = useViewport()

  const customPan: Drag = ({ viewport, delta }) => {
    console.log(
      'pan',
      viewport.translation.x,
      viewport.translation.y,
      delta.x,
      delta.y
    )
    setViewport(prev => ({
      ...prev,
      x: prev.x + delta.x / prev.scale,
      y: prev.y + delta.y / prev.scale,
    }))
  }

  const customAdjust: Drag = ({ viewport, delta }) => {
    console.log(
      'adjust',
      viewport.voi.windowWidth,
      viewport.voi.windowCenter,
      delta.x,
      delta.y
    )
    setViewport(prev => ({
      ...prev,
      windowWidth: prev.windowWidth + delta.x / prev.scale,
      windowCenter: prev.windowCenter + delta.y / prev.scale,
    }))
  }

  function handleCustomPan(e: React.ChangeEvent<HTMLInputElement>) {
    setInteraction((prev: Interaction) => ({
      ...prev,
      primaryDrag: e.target.value === 'none' ? undefined : customPan,
    }))
  }

  function handleCustomAdjust(e: React.ChangeEvent<HTMLInputElement>) {
    setInteraction((prev: Interaction) => ({
      ...prev,
      secondaryDrag: e.target.value === 'none' ? undefined : customAdjust,
    }))
  }

  function handleClick(e) {
    if (e.target.checked) {
      setInteraction((prev: Interaction) => ({
        ...prev,
        primaryClick: // or secondaryClick
          value === 'none'
            ? undefined
            : (offsetX, offsetY) => {
              console.log(offsetX, offsetY)
            },
      }))
    }
  }

  return (
    <>
      <input type="radio" value="pan" onChange={handleCustomPan} />
      <input type="radio" value="adjust" onChange={handleCustomAdjust} />
      <input type="checkbox" value="adjust" onChange={handleClick} />
      <Viewer.Dicom
        imageId={IMAGE_ID}
        interaction={interaction}
        viewport={viewport}
        onViewportChange={setViewport}
      >
        <OverlayLayer viewport={viewport} />
      </Viewer.Dicom>
    </>
  )
}
`

export const WHEEL_CODE = `\
import Viewer, {
  useMultiframe,
  useViewport,
  useInteraction,
  Interaction,
  Wheel,
} from '@lunit/insight-viewer'

export default function App(): JSX.Element {
  const { image, frame, setFrame } = useMultiframe(IMAGES)
  const { viewport, setViewport } = useViewport({
    scale: 0.5,
  })
  const { interaction, setInteraction } = useInteraction()

  const handleFrame: Wheel = (_, deltaY) => {
    if (deltaY !== 0)
      setFrame(prev =>
        Math.min(Math.max(prev + (deltaY > 0 ? 1 : -1), MIN_FRAME), MAX_FRAME)
      )
  }

  const handleZoom: Wheel = (_, deltaY) => {
    if (deltaY !== 0)
      setViewport(prev => ({
        ...prev,
        scale: Math.min(
          Math.max(prev.scale + (deltaY > 0 ? 0.25 : -0.25), MIN_SCALE),
          MAX_SCALE
        ),
      }))
  }

  const handler = {
    frame: handleFrame,
    zoom: handleZoom,
  }

  function handleChange(e) {
    setInteraction((prev: Interaction) => ({
      ...prev,
      [type]: e.target.value === 'none' ? undefined : handler[e.target.value],
    }))
  }

  return (
    <>
      <input type="radio" value="none" onChange={handleChange} />
      <input type="radio" value="frame" onChange={handleChange} />
      <input type="checkbox" value="zoom" onChange={handleChange} />
      <Text>frame: {frame}</Text>
      <Viewer.Dicom imageId={image} />
    </>
  )
}
`
