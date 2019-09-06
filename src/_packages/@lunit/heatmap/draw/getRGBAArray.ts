import { getAlpha } from './getAlpha';
import { getRGBArray } from './getRGBArray';

export function getRGBAArray({stop, threshold}: {stop: number, threshold: number}): [number, number, number, number] {
  const alpha: number = getAlpha({stop, threshold});
  
  if (alpha <= 0) return [0, 0, 0, 0];
  
  const [r, g, b] = getRGBArray(stop);
  
  return [r, g, b, alpha];
}