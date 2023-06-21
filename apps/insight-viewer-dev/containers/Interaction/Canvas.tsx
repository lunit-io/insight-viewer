import React, { useEffect, useRef, useState } from 'react'
import { Viewport } from '@lunit/insight-viewer/viewport'

const style: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
}

const BOX_WIDTH = 100
const BOX_HEIGHT = 100

interface Prop {
  context: CanvasRenderingContext2D | null
  canvas: HTMLCanvasElement | null
  x: number
  y: number
  scale: number
}

function drawRect({ context, canvas, x, y, scale }: Prop) {
  if (!context || !canvas) return

  context.clearRect(0, 0, canvas.width, canvas.height)
  context.save()
  context.translate(canvas.width / 2, canvas.height / 2)
  context.scale(scale, scale)

  context.fillStyle = '#fed7d7'
  context.fillRect(x - BOX_WIDTH / 2, y - BOX_HEIGHT / 2, BOX_WIDTH, BOX_HEIGHT)
  context.restore()
}

export default function Canvas({ viewport }: { viewport: Viewport }): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight
    setContext(canvas.getContext('2d'))
  }, [context])

  useEffect(() => {
    drawRect({
      context,
      canvas: canvasRef.current,
      x: viewport.x,
      y: viewport.y,
      scale: viewport.scale,
    })
  }, [context, viewport])

  return <canvas ref={canvasRef} style={style} />
}
