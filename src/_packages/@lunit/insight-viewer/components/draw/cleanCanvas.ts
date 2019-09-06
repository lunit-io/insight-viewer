// enabledElement로 transform된 canvas의 좌표계를 1:1로 돌린 다음
// pixel을 지우고 다시 원래의 transform 상태로 되돌린다
export function cleanCanvas(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, width, height);
  ctx.restore();
}