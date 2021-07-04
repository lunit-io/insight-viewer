export default LookupTable;
/**
 * Maps scalar values into colors via a lookup table
 * LookupTable is an object that is used by mapper objects to map scalar values into rgba (red-green-blue-alpha transparency) color specification,
 * or rgba into scalar values. The color table can be created by direct insertion of color values, or by specifying hue, saturation, value, and alpha range and generating a table
 */
declare class LookupTable {
    NumberOfColors: number;
    Ramp: string;
    TableRange: number[];
    HueRange: number[];
    SaturationRange: number[];
    ValueRange: number[];
    AlphaRange: number[];
    NaNColor: number[];
    BelowRangeColor: number[];
    UseBelowRangeColor: boolean;
    AboveRangeColor: number[];
    UseAboveRangeColor: boolean;
    InputRange: number[];
    Table: any[];
    /**
     * Specify the number of values (i.e., colors) in the lookup table.
     * @param {Number} number The number of colors in he LookupTable
     * @returns {void}
     * @memberof Colors
     */
    setNumberOfTableValues(number: number): void;
    /**
     * Set the shape of the table ramp to either 'linear', 'scurve' or 'sqrt'
     * @param {String} ramp A string value representing the shape of the table. Allowed values are 'linear', 'scurve' or 'sqrt'
     * @returns {void}
     * @memberof Colors
     */
    setRamp(ramp: string): void;
    /**
     * Sets the minimum/maximum scalar values for scalar mapping.
     * Scalar values less than minimum range value are clamped to minimum range value.
     * Scalar values greater than maximum range value are clamped to maximum range value.
     * @param {Number} start A double representing the minimum scaler value of the LookupTable
     * @param {any} end A double representing the maximum scaler value of the LookupTable
     * @returns {void}
     * @memberof Colors
     */
    setTableRange(start: number, end: any): void;
    /**
     * Set the range in hue (using automatic generation). Hue ranges between [0,1].
     * @param {Number} start A double representing the minimum hue value in a range. Min. is 0
     * @param {Number} end A double representing the maximum hue value in a range. Max. is 1
     * @returns {void}
     * @memberof Colors
     */
    setHueRange(start: number, end: number): void;
    /**
     * Set the range in saturation (using automatic generation). Saturation ranges between [0,1].
     * @param {Number} start A double representing the minimum Saturation value in a range. Min. is 0
     * @param {Number} end A double representing the maximum Saturation value in a range. Max. is 1
     * @returns {void}
     * @memberof Colors
     */
    setSaturationRange(start: number, end: number): void;
    /**
     * Set the range in value (using automatic generation). Value ranges between [0,1].
     * @param {Numeber } start A double representing the minimum value in a range. Min. is 0
     * @param {Numeber} end A double representing the maximum value in a range. Max. is 1
     * @returns {void}
     * @memberof Colors
     */
    setValueRange(start: any, end: any): void;
    /**
     * (Not Used) Sets the range of scalars which will be mapped.
     * @param {Number} start the minimum scalar value in the range
     * @param {Number} end the maximum scalar value in the range
     * @returns {void}
     * @memberof Colors
     */
    setRange(start: number, end: number): void;
    /**
     * Set the range in alpha (using automatic generation). Alpha ranges from [0,1].
     * @param {Number} start A double representing the minimum alpha value
     * @param {Number} end A double representing the maximum alpha value
     * @returns {void}
     * @memberof Colors
     */
    setAlphaRange(start: number, end: number): void;
    /**
     * Map one value through the lookup table and return the color as an
     * RGBA array of doubles between 0 and 1.
     * @param {Number} scalar A double scalar value which will be mapped to a color in the LookupTable
     * @returns {Number[]} An RGBA array of doubles between 0 and 1
     * @memberof Colors
     */
    getColor(scalar: number): number[];
    /**
     * Generate lookup table from hue, saturation, value, alpha min/max values. Table is built from linear ramp of each value.
     * @param {Boolean} force true to force the build of the LookupTable. Otherwie, false. This is useful if a lookup table has been defined manually
     * (using SetTableValue) and then an application decides to rebuild the lookup table using the implicit process.
     * @returns {void}
     * @memberof Colors
     */
    build(force: boolean): void;
    /**
     * Ensures the out-of-range colors (Below range and Above range) are set correctly.
     * @returns {void}
     * @memberof Colors
     */
    buildSpecialColors(): void;
    /**
     * Similar to GetColor - Map one value through the lookup table and return the color as an
     * RGBA array of doubles between 0 and 1.
     * @param {Numeber} v A double scalar value which will be mapped to a color in the LookupTable
     * @returns {Number[]} An RGBA array of doubles between 0 and 1
     * @memberof Colors
     */
    mapValue(v: any): number[];
    /**
     * Return the table index associated with a particular value.
     * @param {Number} v A double value which table index will be returned.
     * @returns {Number} The index in the LookupTable
     * @memberof Colors
     */
    getIndex(v: number): number;
    /**
     * Directly load color into lookup table. Use [0,1] double values for color component specification.
     * Make sure that you've either used the Build() method or used SetNumberOfTableValues() prior to using this method.
     * @param {Number} index The index in the LookupTable of where to insert the color value
     * @param {Number[]} rgba An array of [0,1] double values for an RGBA color component
     * @returns {void}
     * @memberof Colors
     */
    setTableValue(index: number, rgba: number[], ...args: any[]): void;
}
