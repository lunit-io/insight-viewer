import { Image, Viewport } from "./enabledElements";
/**
 * Sets a new image object for a given element.
 *
 * Will also apply an optional viewport setting.
 *
 * @param element An HTML Element enabled for Cornerstone
 * @param image An Image loaded by a Cornerstone Image Loader
 * @param [viewport] A set of Cornerstone viewport parameters
 * @memberof Drawing
 */
export default function _default(element: HTMLElement, image: Image, viewport?: Viewport): void;
