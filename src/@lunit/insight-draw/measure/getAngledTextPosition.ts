import { Property } from 'csstype';
import { radToDirection } from './radToDirection';

const dominantBaselineMap = {
  east: 'middle',
  south: 'text-after-edge',
  west: 'middle',
  north: 'text-before-edge',
} as const;

const textAnchorMap = {
  east: 'start',
  south: 'middle',
  west: 'end',
  north: 'middle',
} as const;

export interface GetAngledTextPositionParams {
  start: [number, number];
  end: [number, number];
  fontSize: number;
}

export function getAngledTextPosition({
  start,
  end,
  fontSize,
}: GetAngledTextPositionParams): {
  x: number;
  y: number;
  textAnchor: Property.TextAnchor;
  dominantBaseline: Property.DominantBaseline;
  'data-direction': 'south' | 'north' | 'east' | 'west';
} {
  const rad: number = Math.atan2(start[1] - end[1], start[0] - end[0]);
  const direction = radToDirection(rad + Math.PI);
  const x: number = fontSize * Math.cos(rad + Math.PI) + end[0];
  const y: number = fontSize * Math.sin(rad + Math.PI) + end[1];

  return {
    x,
    y:
      direction === 'north'
        ? y - fontSize
        : direction === 'south'
        ? y + fontSize
        : y,
    textAnchor: textAnchorMap[direction],
    dominantBaseline: dominantBaselineMap[direction],
    'data-direction': direction,
  };
}
