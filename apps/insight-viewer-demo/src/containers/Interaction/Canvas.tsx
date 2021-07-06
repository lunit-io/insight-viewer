import React, { useEffect, useRef, useState } from 'react'
import { Viewport } from '@lunit/insight-viewer'

const style: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 10,
}

const BOX_WIDTH = 100
const BOX_HEIGHT = 100

interface Prop {
  context: CanvasRenderingContext2D | null
  canvas: HTMLCanvasElement | null
  x: number
  y: number
}

function drawRect({ context, canvas, x, y }: Prop) {
  if (!context || !canvas) return

  context.clearRect(0, 0, canvas.width, canvas.height)
  context.fillStyle = '#fed7d7'
  context.fillRect(x, y, BOX_WIDTH, BOX_HEIGHT)
}

export default function Canvas({
  viewport: { x, y },
}: {
  viewport: Viewport
}): JSX.Element {
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
      x:
        x +
        (canvasRef?.current ? canvasRef.current.width / 2 : 0) -
        BOX_WIDTH / 2,
      y:
        y +
        (canvasRef?.current ? canvasRef.current.height / 2 : 0) -
        BOX_HEIGHT / 2,
    })
  }, [x, y, context])

  return <canvas ref={canvasRef} style={style} />
}
