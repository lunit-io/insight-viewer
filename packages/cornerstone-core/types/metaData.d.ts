export type Provider = (type: string, imageId: string) => any
/**
 * Adds a metadata provider with the specified priority
 * @param {Function} provider Metadata provider function
 * @param {Number} [priority=0] - 0 is default/normal, > 0 is high, < 0 is low
 *
 * @returns {void}
 * @memberof Metadata
 */
export function addProvider(provider: Provider, priority?: number): void;
/**
 * Removes the specified provider
 *
 * @param {Function} provider Metadata provider function
 *
 * @returns {void}
 * @memberof Metadata
 */
export function removeProvider(provider: Provider): void;
declare namespace _default {
    export { addProvider };
    export { removeProvider };
    export { getMetaData as get };
}
export default _default;
/**
 * Gets metadata from the registered metadata providers.  Will call each one from highest priority to lowest
 * until one responds
 *
 * @param {String} type The type of metadata requested from the metadata store
 * @param {String} imageId The Cornerstone Image Object's imageId
 *
 * @returns {*} The metadata retrieved from the metadata store
 * @memberof Metadata
 */
declare function getMetaData(type: string, imageId: string): any;
