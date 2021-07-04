/**
 * Converts the image pixel data into a false color data
 *
 * @param {Image} image A Cornerstone Image Object
 * @param {Object} lookupTable A lookup table Object
 *
 * @returns {void}
 * @deprecated This function is superseded by the ability to set the Viewport parameters
 * to include colormaps.
 */
export default function pixelDataToFalseColorData(image: new (width?: number, height?: number) => HTMLImageElement, lookupTable: any): void;
