import { PixelCoordinate } from "./CoordinateSystem";

/**
 * Converts a point in the page coordinate system to the pixel coordinate
 * system
 *
 * @param element The Cornerstone element within which the input point lies
 * @param pageX The x value in the page coordinate system
 * @param pageY The y value in the page coordinate system
 *
 * @returns The transformed point in the pixel coordinate system
 */
export default function _default(element: HTMLElement, pageX: number, pageY: number): PixelCoordinate;
