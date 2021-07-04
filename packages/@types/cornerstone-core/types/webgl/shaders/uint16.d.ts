export namespace uint16DataUtilities {
    export { storedPixelDataToImageData };
}
/**
 * Convert stored pixel data to image data.
 *
 * For uint16 pack uint16 into two uint8 channels (r and a).
 *
 * @param {Image} image A Cornerstone Image Object
 * @returns {Uint8Array} The image data for use by the WebGL shader
 * @memberof WebGLRendering
 */
declare function storedPixelDataToImageData(image: new (width?: number, height?: number) => HTMLImageElement): Uint8Array;
export namespace uint16Shader {
    const frag: string;
}
export {};
