/**
 * Converts a point in the page coordinate system to the pixel coordinate
 * system
 *
 * @param {HTMLElement} element The Cornerstone element within which the input point lies
 * @param {Number} pageX The x value in the page coordinate system
 * @param {Number} pageY The y value in the page coordinate system
 *
 * @returns {{x: Number, y: Number}} The transformed point in the pixel coordinate system
 */
export default function _default(element: HTMLElement, pageX: number, pageY: number): {
    x: number;
    y: number;
};
