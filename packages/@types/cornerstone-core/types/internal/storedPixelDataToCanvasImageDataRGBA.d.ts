/**
 * This function transforms stored pixel values into a canvas image data buffer
 * by using a LUT.
 *
 * @param {Image} image A Cornerstone Image Object
 * @param {Array} lut Lookup table array
 * @param {Uint8ClampedArray} canvasImageDataData canvasImageData.data buffer filled with white pixels
 *
 * @returns {void}
 * @memberof Internal
 */
export default function _default(image: new (width?: number, height?: number) => HTMLImageElement, lut: any[], canvasImageDataData: Uint8ClampedArray): void;
