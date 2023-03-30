import React, { useEffect, useRef, useState, MouseEvent } from 'react'

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

  function startDrawing({ nativeEvent: { offsetX, offsetY } }: MouseEvent) {
    setIsMouseDown(true)
    context?.beginPath()
    context?.moveTo(offsetX, offsetY)
  }

  function stopDrawing() {
    setIsMouseDown(false)
    context?.closePath()
  }

  function draw({ nativeEvent: { offsetX, offsetY } }: MouseEvent) {
    if (!isMouseDown) return
    context?.lineTo(offsetX, offsetY)
    context?.stroke()
  }

  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    setContext(ctx)
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight
    if (ctx) ctx.strokeStyle = '#00FF00'
  }, [])

  return <canvas ref={canvasRef} style={style} onMouseDown={startDrawing} onMouseUp={stopDrawing} onMouseMove={draw} />
}
