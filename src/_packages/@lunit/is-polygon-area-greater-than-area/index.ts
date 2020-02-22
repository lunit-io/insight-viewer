export function isPolygonAreaGreaterThanArea(polygon: [number, number][], isGreaterThanArea: number = 100): boolean {
  // https://stackoverflow.com/questions/16285134/calculating-polygon-area
  // polygon의 면적을 계산해서 최소 면적 이상인 경우를 검증한다

  let total: number = 0;

  for (let i = 0, l = polygon.length; i < l; i++) {
    const addX: number = polygon[i][0];
    const addY: number = polygon[i === polygon.length - 1 ? 0 : i + 1][1];
    const subX: number = polygon[i === polygon.length - 1 ? 0 : i + 1][0];
    const subY: number = polygon[i][1];

    total += addX * addY * 0.5;
    total -= subX * subY * 0.5;
  }

  return Math.abs(total) > isGreaterThanArea;
}
