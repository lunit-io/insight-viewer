import { getRGBArray } from './getRGBArray';

/**
 * posMap data를 ImageData 객체로 변환한다
 *
 * threshold는 보통 CXR=0.15 MMG=0.1 (개별 프로젝트에 따라 확인 필요)
 */
export function posMapToImageData(posMap: number[][], threshold: number): ImageData {
  const width: number = posMap[0].length;
  const height: number = posMap.length;
  const canvas: HTMLCanvasElement = document.createElement('canvas');
  const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;
  const imageData: ImageData = ctx!.createImageData(width, height);
  // [r, g, b, a, r, g, b, a, ...]
  const imageDataRgbaMap: Uint8ClampedArray = imageData.data;

  let y: number = -1;
  while (++y < height) {
    let x: number = -1;
    while (++x < width) {
      // rgba array index position
      const pos: number = (y * width + x) * 4;
      const stop: number = posMap[y][x];

      if (stop < threshold) {
        imageDataRgbaMap[pos] = 0;
        imageDataRgbaMap[pos + 1] = 0;
        imageDataRgbaMap[pos + 2] = 0;
        imageDataRgbaMap[pos + 3] = 0;
      } else {
        // eg. threshold = 0.1 / stop = 0.3
        // <threshold를 제외한 stop 값>(0.3 - 0.1) / <threshold를 제외한 max 값>(1 - 0.1)
        // 0.2 / 0.9 = 0.222222222
        const value: number = (stop - threshold) / (1 - threshold);
        const [r, g, b] = getRGBArray(value);
        imageDataRgbaMap[pos] = r;
        imageDataRgbaMap[pos + 1] = g;
        imageDataRgbaMap[pos + 2] = b;
        imageDataRgbaMap[pos + 3] = (value * 196) << 0;
      }
    }
  }

  return imageData;
}
