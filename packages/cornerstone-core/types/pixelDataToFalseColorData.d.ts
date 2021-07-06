import { Image } from "./enabledElements";

/**
 * Converts the image pixel data into a false color data
 *
 * @param image A Cornerstone Image Object
 * @param lookupTable A lookup table Object
 *
 * @deprecated This function is superseded by the ability to set the Viewport parameters
 * to include colormaps.
 */
export default function pixelDataToFalseColorData(image: Image, lookupTable: any): void;
