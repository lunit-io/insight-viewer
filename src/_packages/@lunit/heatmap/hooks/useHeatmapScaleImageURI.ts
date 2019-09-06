import { useMemo } from 'react';
import { getRGBAArray } from '../draw/getRGBAArray';

interface UseHeatmapScaleImageURIParameters {
  width: number;
  height: number;
  threshold: number;
}

/**
 * `width x height` 사이즈의 Reactangle Image를 만들어준다. Image는 Data URI 형태로 전달되기 때문에 `<img src={uri}/>`나 `<image xlink:href={uri}/>`로 사용할 수 있다.
 */
export function useHeatmapScaleImageURI({width, height, threshold}: UseHeatmapScaleImageURIParameters): string | null {
  return useMemo<string | null>(() => {
    const canvas: HTMLCanvasElement | null = document.createElement('canvas');
    if (!canvas) return null;
    
    const ratio: number = window.devicePixelRatio;
    const w: number = width * ratio;
    const h: number = height * ratio;
    
    canvas.setAttribute('width', w.toString());
    canvas.setAttribute('height', h.toString());
    
    const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
    if (!ctx) return null;
    
    let i: number = w + 1;
    while (--i >= 0) {
      ctx.beginPath();
      ctx.fillStyle = `rgba(${getRGBAArray({stop: i / w, threshold})})`;
      ctx.fillRect(i, 0, 1, h);
      ctx.closePath();
    }
    
    return canvas.toDataURL();
  }, [threshold, width, height]);
}