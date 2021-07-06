import { PixelCoordinate } from "./CoordinateSystem";
import { CanvasCoordinate } from "./CoordinateSystem";

/**
 * Converts a point in the pixel coordinate system to the canvas coordinate system
 * system.  This can be used to render using canvas context without having the weird
 * side effects that come from scaling and non square pixels
 *
 * @param element An HTML Element enabled for Cornerstone
 * @param pt The transformed point in the pixel coordinate system
 *
 * @returns The input point in the canvas coordinate system
 * @memberof PixelCoordinateSystem
 */
export default function _default(element: HTMLElement, pt: PixelCoordinate): CanvasCoordinate;
