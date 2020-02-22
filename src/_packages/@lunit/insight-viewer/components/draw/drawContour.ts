import { setToPixelCoordinateSystem } from 'cornerstone-core';
import polylabel from 'polylabel';
import { Contour, CornerstoneRenderData } from '../../types';

export function drawContour(
  { enabledElement }: CornerstoneRenderData,
  ctx: CanvasRenderingContext2D,
  { id, polygon }: Contour,
  lineWidth: number = 3,
  stokeStye: string = 'black',
  fillStyle: string = 'rgba(0, 0, 0, 0.1)',
  font: string = 'normal normal 600 20px proximanova',
) {
  const labelCenter: number[] = polylabel([polygon], 1);

  setToPixelCoordinateSystem(enabledElement, ctx);

  ctx.beginPath();
  ctx.strokeStyle = stokeStye;
  ctx.lineWidth = lineWidth;
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';

  const [[startX, startY], ...drawPoints] = polygon;

  ctx.moveTo(startX, startY);
  for (const [x, y] of drawPoints) {
    ctx.lineTo(x, y);
  }
  ctx.lineTo(startX, startY);

  ctx.fill();
  ctx.stroke();
  ctx.closePath();

  ctx.beginPath();
  ctx.fillStyle = stokeStye;
  ctx.font = font;
  ctx.textAlign = 'center';
  ctx.fillText(id.toString(), labelCenter[0], labelCenter[1]);
  ctx.fill();
  ctx.closePath();
}
