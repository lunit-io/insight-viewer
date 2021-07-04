/**
 * Convert an image to a false color image
 *
 * @param {Image} image A Cornerstone Image Object
 * @param {String|Object} colormap - it can be a colormap object or a colormap id (string)
 *
 * @returns {Boolean} - Whether or not the image has been converted to a false color image
 */
export function convertImageToFalseColorImage(image: new (width?: number, height?: number) => HTMLImageElement, colormap: string | any): boolean;
/**
 * Convert the image of a element to a false color image
 *
 * @param {HTMLElement} element The Cornerstone element
 * @param {*} colormap - it can be a colormap object or a colormap id (string)
 *
 * @returns {void}
 */
export function convertToFalseColorImage(element: HTMLElement, colormap: any): void;
/**
 * Restores a false color image to its original version
 *
 * @param {Image} image A Cornerstone Image Object
 * @returns {Boolean} True if the image object had a valid restore function, which was run. Otherwise, false.
 */
export function restoreImage(image: new (width?: number, height?: number) => HTMLImageElement): boolean;
