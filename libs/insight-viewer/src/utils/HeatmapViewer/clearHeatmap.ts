interface HeatmapClearProps {
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
}

export default function clearHeatmap({ canvas, context }: HeatmapClearProps): void {
  context.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)
}
