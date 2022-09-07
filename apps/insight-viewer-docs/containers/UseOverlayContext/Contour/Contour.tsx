/* eslint-disable import/no-unresolved */
/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-properties */
import { useRef, useEffect, CSSProperties } from 'react'
import { useOverlayContext } from '@lunit/insight-viewer'
import { CONTOURS } from '@insight-viewer-library/fixtures'
import annotations from './annotations'

const style: CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
} as const

const CONTOUR_THICKNESS = 8

function drawContour({
  ctx,
  points,
  thickness,
}: {
  ctx: CanvasRenderingContext2D
  points: [number, number][]
  thickness: number
}) {
  ctx.beginPath()
  ctx.moveTo(points[0][0], points[0][1])
  points.forEach(([x, y]) => {
    ctx.lineTo(x, y)
  })
  ctx.lineTo(points[0][0], points[0][1])
  ctx.closePath()
  ctx.lineWidth = thickness
  ctx.strokeStyle = 'black'
  ctx.stroke()
  ctx.lineWidth = thickness / 3
  ctx.strokeStyle = 'white'
  ctx.stroke()
}

function drawAnnotation({
  ctx,
  annotation,
}: {
  ctx: CanvasRenderingContext2D
  annotation: {
    anchor: number[]
    foot: number[]
    text: string
  }
}) {
  const { anchor, foot, text } = annotation
  const length = Math.sqrt(Math.pow(anchor[0] - foot[0], 2) + Math.pow(anchor[1] - foot[1], 2))
  const vectorX = (anchor[0] - foot[0]) / length
  const vectorY = (anchor[1] - foot[1]) / length
  const arrowX = vectorX * Math.max(16, 4)
  const arrowY = vectorY * Math.max(16, 4)
  const scaledLineWidth = Math.max(8, 1)

  ctx.save()

  ctx.lineCap = 'square'
  ctx.lineWidth = scaledLineWidth
  ctx.strokeStyle = 'black'
  ctx.beginPath()
  ctx.moveTo(anchor[0] - arrowX, anchor[1] - arrowY)
  ctx.lineTo(foot[0], foot[1])
  ctx.stroke()
  ctx.lineWidth = scaledLineWidth / 3
  ctx.strokeStyle = 'white'
  ctx.stroke()

  // arrow head
  ctx.strokeStyle = 'black'
  ctx.lineWidth = scaledLineWidth / 3
  ctx.fillStyle = 'white'
  ctx.beginPath()
  ctx.moveTo(anchor[0], anchor[1])
  ctx.lineTo(anchor[0] - arrowX - arrowY * 0.5, anchor[1] - arrowY + arrowX * 0.5)
  ctx.lineTo(anchor[0] - arrowX + arrowY * 0.5, anchor[1] - arrowY - arrowX * 0.5)
  ctx.closePath()
  ctx.fill()
  ctx.stroke()

  // text
  // eslint-disable-next-line prefer-template
  ctx.font = scaledLineWidth * 10 + 'px proximanova_semibold, sans-serif'
  ctx.strokeStyle = 'black'
  ctx.lineWidth = (scaledLineWidth / 3) * 2
  const textMetrics = ctx.measureText(text)
  const textX = anchor[0] - foot[0] < 0 ? foot[0] + scaledLineWidth : foot[0] - textMetrics.width - scaledLineWidth
  const textY = anchor[1] - foot[1] < 0 ? foot[1] + scaledLineWidth * 7 : foot[1]
  ctx.strokeText(text, textX, textY)
  ctx.fillText(text, textX, textY)
  ctx.restore()
}

function clear(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D | null) {
  if (!context) return
  context.save()
  // Use the identity matrix while clearing the canvas
  context.setTransform(1, 0, 0, 1, 0, 0)
  context.clearRect(0, 0, canvas.width, canvas.height)
  context.restore()
}

function draw({
  canvas,
  setToPixelCoordinateSystem,
}: {
  canvas: HTMLCanvasElement | null
  setToPixelCoordinateSystem: (context: CanvasRenderingContext2D) => void
}) {
  if (!CONTOURS || !canvas) return
  const context = canvas.getContext('2d')
  clear(canvas, context)
  const { offsetWidth, offsetHeight } = canvas
  canvas.width = offsetWidth
  canvas.height = offsetHeight

  if (!context) return
  context.save()

  setToPixelCoordinateSystem(context)

  const scaledThickness = Math.max(CONTOUR_THICKNESS, 1)

  CONTOURS.forEach((contour) => {
    const transformedPoints: [number, number][] = contour.points.map((point) => [point[0], point[1]])
    drawContour({
      ctx: context,
      points: transformedPoints,
      thickness: scaledThickness,
    })
  })

  if (!annotations) return
  annotations.forEach((annotation) => {
    const scaledAnnotation = {
      anchor: [annotation.anchor[0], annotation.anchor[1]],
      foot: [annotation.foot[0], annotation.foot[1]],
      text: annotation.text,
    }

    drawAnnotation({
      ctx: context,
      annotation: scaledAnnotation,
    })
  })

  context.restore()
}

export default function ContourComponent(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvas = canvasRef?.current
  const context = canvas?.getContext('2d')
  const { setToPixelCoordinateSystem } = useOverlayContext()

  useEffect(() => {
    if (!context) return

    draw({
      canvas,
      setToPixelCoordinateSystem,
    })
  }, [canvas, context, setToPixelCoordinateSystem])

  return <canvas ref={canvasRef} style={style} />
}
