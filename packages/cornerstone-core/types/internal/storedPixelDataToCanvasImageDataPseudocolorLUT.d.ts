export default storedPixelDataToCanvasImageDataPseudocolorLUT;
/**
 *
 * @param {Image} image A Cornerstone Image Object
 * @param {Array} grayscaleLut Lookup table array
 * @param {LookupTable|Array} colorLut Lookup table array
 * @param {Uint8ClampedArray} canvasImageDataData canvasImageData.data buffer filled with white pixels
 *
 * @returns {void}
 * @memberof Internal
 */
declare function storedPixelDataToCanvasImageDataPseudocolorLUT(image: new (width?: number, height?: number) => HTMLImageElement, grayscaleLut: any[], colorLut: any | any[], canvasImageDataData: Uint8ClampedArray): void;
