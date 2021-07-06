export default storedPixelDataToCanvasImageDataPseudocolorLUT;
/**
 *
 * @param image A Cornerstone Image Object
 * @param grayscaleLut Lookup table array
 * @param colorLut Lookup table array
 * @param canvasImageDataData canvasImageData.data buffer filled with white pixels
 *
 * @memberof Internal
 */
declare function storedPixelDataToCanvasImageDataPseudocolorLUT(image: new (width?: number, height?: number) => HTMLImageElement, grayscaleLut: any[], colorLut: any | any[], canvasImageDataData: Uint8ClampedArray): void;
