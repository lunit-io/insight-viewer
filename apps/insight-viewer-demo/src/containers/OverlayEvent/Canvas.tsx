import React, {
  useEffect,
  useRef,
  useState,
  useContext,
  MouseEvent,
} from 'react'
import { useViewport } from '@lunit/insight-viewer'
import Context, { EVENT_TYPE } from './Context'

const style: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 10,
}

export default function Canvas(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null)
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false)
  const { eventType } = useContext(Context)
  const {
    viewport: { x, y },
  } = useViewport()

  function startDrawing({ nativeEvent: { offsetX, offsetY } }: MouseEvent) {
    setIsMouseDown(true)

    if (eventType === EVENT_TYPE.draw) {
      context?.beginPath()
      context?.moveTo(offsetX, offsetY)
    }
  }

  function stopDrawing() {
    setIsMouseDown(false)
    if (eventType === EVENT_TYPE.draw) {
      context?.closePath()
    }
  }

  function draw({ nativeEvent: { offsetX, offsetY } }: MouseEvent) {
    if (!isMouseDown) return
    if (eventType === EVENT_TYPE.draw) {
      context?.lineTo(offsetX, offsetY)
      context?.stroke()
    }
  }

  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    setContext(canvas.getContext('2d'))
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current

    function moveCanvas() {
      if (canvas) {
        canvas.style.transform = `translate(${x}px, ${y}px)`
      }
    }
    moveCanvas()
  }, [x, y, context])

  return (
    <canvas
      ref={canvasRef}
      style={style}
      onMouseDown={startDrawing}
      onMouseUp={stopDrawing}
      onMouseMove={draw}
    />
  )
}
