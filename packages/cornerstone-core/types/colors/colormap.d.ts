/**
 * Return all available colormaps (id and name)
 * @returns {Array<{id,key}>} An array of colormaps with an object containing the "id" and display "name"
 * @memberof Colors
 */
export function getColormapsList(): Array<{
    id;
    key;
}>;
/**
 * Return a colorMap object with the provided id and colormapData
 * if the Id matches existent colorMap objects (check colormapsData) the colormapData is ignored.
 * if the colormapData is not empty, the colorMap will be added to the colormapsData list. Otherwise, an empty colorMap object is returned.
 * @param {string} id The ID of the colormap
 * @param {Object} colormapData - An object that can contain a name, numColors, gama, segmentedData and/or colors
 * @returns {*} The Colormap Object
 * @memberof Colors
*/
export function getColormap(id: string, colormapData: any): any;
