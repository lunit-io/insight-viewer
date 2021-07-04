export default storedPixelDataToCanvasImageDataColorLUT;
/**
 *
 * @param {Image} image A Cornerstone Image Object
 * @param {LookupTable|Array} colorLut Lookup table array
 * @param {Uint8ClampedArray} canvasImageDataData canvasImageData.data buffer filled with white pixels
 *
 * @returns {void}
 * @memberof Internal
 */
declare function storedPixelDataToCanvasImageDataColorLUT(image: new (width?: number, height?: number) => HTMLImageElement, colorLut: any | any[], canvasImageDataData: Uint8ClampedArray): void;
