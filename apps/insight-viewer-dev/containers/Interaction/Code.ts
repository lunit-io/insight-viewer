export const BASE_CODE = `\
import { useRef } from 'react'
import InsightViewer, { useInteraction, useMultipleImages, useFrame, Interaction, Wheel } from '@lunit/insight-viewer'
import { useViewport } from '@lunit/insight-viewer/viewport'

export const IMAGES = [
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000000.dcm',
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000001.dcm',
]

const MIN_FRAME = 0
const MAX_FRAME = IMAGES.length - 1

export default function App(): JSX.Element {
  const viewerRef = useRef<HTMLDivElement>(null)

  const { images } = useMultipleImages({
    wadouri: IMAGES,
  })

  const { frame, setFrame } = useFrame({
    initial: 0,
    max: images.length - 1,
  })

  const { interaction, setInteraction } = useInteraction()

  const { viewport, setViewport, resetViewport } = useViewport({
    image: images[frame],
    viewerRef,
    getInitialViewport: (prevViewport) => ({ ...prevViewport, scale: 1 }),
  })

  const handleFrame: Wheel = (_, deltaY) => {
    if (deltaY !== 0) setFrame((prev) => Math.min(Math.max(prev + (deltaY > 0 ? 1 : -1), MIN_FRAME), MAX_FRAME))
  }

  const handler = {
    frame: handleFrame,
    // A constant named scale executes the default behavior of the scale mouse wheel event.
    scale: 'scale' as const,
  }

  /**
   * type is either primaryDrag or secondaryDrag.
   * value is one of none, pan, adjust, zoom.
   */
  const handleDragOptionChange = (type: string, value: string) => {
    setInteraction((prev: Interaction) => ({
      ...prev,
      [type]: value === 'none' ? undefined : value,
    }))
  }

  const handleWheel = (value: string) => {
    setInteraction((prev: Interaction) => ({
      ...prev,
      mouseWheel: value === 'none' ? undefined : handler[value as keyof typeof handler],
    }))
  }

  return (
    <div>
      <span>Drag interaction</span>
      <div>
        <input
          type="radio"
          id="none"
          name="drag"
          value="none"
          onChange={(e) => handleDragOptionChange('primaryDrag', e.target.value)}
        />
        <label htmlFor="none">none</label>
      </div>
      <div>
        <input
          type="radio"
          id="pan"
          name="drag"
          value="pan"
          onChange={(e) => handleDragOptionChange('primaryDrag', e.target.value)}
        />
        <label htmlFor="pan">pan</label>
      </div>
      <div>
        <input
          type="radio"
          id="adjust"
          name="drag"
          value="adjust"
          onChange={(e) => handleDragOptionChange('primaryDrag', e.target.value)}
        />
        <label htmlFor="adjust">adjust</label>
      </div>
      <div>
        <input
          type="radio"
          id="zoom"
          name="drag"
          value="zoom"
          onChange={(e) => handleDragOptionChange('primaryDrag', e.target.value)}
        />
        <label htmlFor="zoom">zoom</label>
      </div>
      <span>Wheel interaction</span>
      <div>
        <input
          type="radio"
          id="none"
          name="wheel"
          value="none"
          onChange={(e) => handleWheel(e.target.value)}
        />
        <label htmlFor="none">none</label>
      </div>
      <div>
        <input
          type="radio"
          id="frame"
          name="wheel"
          value="frame"
          onChange={(e) => handleWheel(e.target.value)}
        />
        <label htmlFor="frame">frame</label>
      </div>
      <div>
        <input
          type="radio"
          id="scale"
          name="wheel"
          value="scale"
          onChange={(e) => handleWheel(e.target.value)}
        />
        <label htmlFor="scale">scale</label>
      </div>
      <button onClick={resetViewport}>Reset</button>
      <div style={{ width: '500px', height: '500px' }}>
        <InsightViewer
          viewerRef={viewerRef}
          image={images[frame]}
          interaction={interaction}
          onViewportChange={setViewport}
          viewport={viewport}
        />
      </div>
    </div>
  )
}
`

export const CUSTOM_CODE = `\
import { useRef } from 'react'
import InsightViewer, { useInteraction, useMultipleImages, useFrame, Interaction, Wheel } from '@lunit/insight-viewer'
import { useViewport } from '@lunit/insight-viewer/viewport'

export const IMAGES = [
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000000.dcm',
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000001.dcm',
]

const MIN_FRAME = 0
const MAX_FRAME = IMAGES.length - 1

export default function App(): JSX.Element {
  const viewerRef = useRef<HTMLDivElement>(null)

  const { images } = useMultipleImages({
    wadouri: IMAGES,
  })

  const { frame, setFrame } = useFrame({
    initial: 0,
    max: images.length - 1,
  })

  const { interaction, setInteraction } = useInteraction()

  const { viewport, setViewport, resetViewport } = useViewport({
    image: images[frame],
    viewerRef,
    getInitialViewport: (prevViewport) => ({ ...prevViewport, scale: 1 }),
  })

  const handleFrame: Wheel = (_, deltaY) => {
    if (deltaY !== 0) setFrame((prev) => Math.min(Math.max(prev + (deltaY > 0 ? 1 : -1), MIN_FRAME), MAX_FRAME))
  }

  const customPan = ({ delta }) => {
    setViewport((prev) => ({
      ...prev,
      x: prev.x + delta.x / prev.scale,
      y: prev.y + delta.y / prev.scale,
    }))
  }

  const customAdjust = ({ delta }) => {
    setViewport((prev) => ({
      ...prev,
      windowWidth: prev.windowWidth + delta.x / prev.scale,
      windowCenter: prev.windowCenter + delta.y / prev.scale,
    }))
  }

  const customZoom = ({ delta }) => {
    setViewport((prev) => ({
      ...prev,
      scale: prev.scale + delta.x / 100,
    }))
  }

  const customDrag = {
    pan: customPan,
    adjust: customAdjust,
    zoom: customZoom,
  }

  const handler = {
    frame: handleFrame,
    // A constant named scale executes the default behavior of the scale mouse wheel event.
    scale: 'scale' as const,
  }

  /**
   * type is either primaryDrag or secondaryDrag.
   * value is one of none, pan, adjust, zoom.
   */
  const handleDragOptionChange = (type: string, value: string) => {
    setInteraction((prev: Interaction) => ({
      ...prev,
      // if the type value is function, interaction running that function
      [type]: value === 'none' ? undefined : customDrag[value],
    }))
  }

  const handleWheel = (value: string) => {
    setInteraction((prev: Interaction) => ({
      ...prev,
      mouseWheel: value === 'none' ? undefined : handler[value as keyof typeof handler],
    }))
  }

  return (
    <div>
      <span>Drag interaction</span>
      <div>
        <input
          type="radio"
          id="none"
          name="drag"
          value="none"
          onChange={(e) => handleDragOptionChange('primaryDrag', e.target.value)}
        />
        <label htmlFor="none">none</label>
      </div>
      <div>
        <input
          type="radio"
          id="pan"
          name="drag"
          value="pan"
          onChange={(e) => handleDragOptionChange('primaryDrag', e.target.value)}
        />
        <label htmlFor="pan">pan</label>
      </div>
      <div>
        <input
          type="radio"
          id="adjust"
          name="drag"
          value="adjust"
          onChange={(e) => handleDragOptionChange('primaryDrag', e.target.value)}
        />
        <label htmlFor="adjust">adjust</label>
      </div>
      <div>
        <input
          type="radio"
          id="zoom"
          name="drag"
          value="zoom"
          onChange={(e) => handleDragOptionChange('primaryDrag', e.target.value)}
        />
        <label htmlFor="zoom">zoom</label>
      </div>
      <span>Wheel interaction</span>
      <div>
        <input type="radio" id="none" name="wheel" value="none" onChange={(e) => handleWheel(e.target.value)} />
        <label htmlFor="none">none</label>
      </div>
      <div>
        <input type="radio" id="frame" name="wheel" value="frame" onChange={(e) => handleWheel(e.target.value)} />
        <label htmlFor="frame">frame</label>
      </div>
      <div>
        <input type="radio" id="scale" name="wheel" value="scale" onChange={(e) => handleWheel(e.target.value)} />
        <label htmlFor="scale">scale</label>
      </div>
      <button onClick={resetViewport}>Reset</button>
      <div style={{ width: '500px', height: '500px' }}>
        <InsightViewer
          viewerRef={viewerRef}
          image={images[frame]}
          interaction={interaction}
          onViewportChange={setViewport}
          viewport={viewport}
        />
      </div>
    </div>
  )
}
`
