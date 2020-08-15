import { CornerstoneRenderData, Point } from '../../types';

export function drawActivePolygon(
  { enabledElement }: CornerstoneRenderData,
  ctx: CanvasRenderingContext2D,
  polygon: Point[],
  lineWidth: number = 3,
  strokeStyle: string = 'rgba(0, 0, 255, 0.6)',
  closeStrokeStyle: string = 'rgba(0, 0, 255, 0.2)',
) {
  const [[startX, startY], ...drawPoints] = polygon;
  const [endX, endY] = drawPoints[drawPoints.length - 1];

  cornerstone.setToPixelCoordinateSystem(enabledElement!, ctx);

  // draw paths
  ctx.beginPath();
  ctx.strokeStyle = strokeStyle;
  ctx.lineWidth = lineWidth;

  ctx.moveTo(startX, startY);
  for (const [x, y] of drawPoints) {
    ctx.lineTo(x, y);
  }

  ctx.stroke();
  ctx.closePath();

  // draw to start
  ctx.beginPath();
  ctx.strokeStyle = closeStrokeStyle;
  ctx.lineWidth = lineWidth;

  ctx.moveTo(endX, endY);
  ctx.lineTo(startX, startY);
  ctx.stroke();
  ctx.closePath();
}
