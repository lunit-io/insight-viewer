import { rad360 } from './rad360';

export function radToDirection(rad: number): 'south' | 'north' | 'east' | 'west' {
  const deg: number = (rad360(rad) * 180) / Math.PI;

  if (deg < 45) {
    return 'east';
  } else if (deg < 45 * 3) {
    return 'south';
  } else if (deg < 45 * 5) {
    return 'west';
  } else if (deg < 45 * 7) {
    return 'north';
  } else {
    return 'east';
  }
}
