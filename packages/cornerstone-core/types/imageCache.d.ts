import { ImageLoadObject } from "./enabledElements";

/** Sets the maximum size of cache and purges cache contents if necessary.
 *
 * @param {number} numBytes The maximun size that the cache should occupy.
 * @returns {void}
 */
export function setMaximumSizeBytes(numBytes: number): void;
/**
 * Puts a new image loader into the cache
 *
 * @param {string} imageId ImageId of the image loader
 * @param {Object} imageLoadObject The object that is loading or loaded the image
 * @returns {void}
 */
export function putImageLoadObject(imageId: string, imageLoadObject: ImageLoadObject): void;
/**
 * Retuns the object that is loading a given imageId
 *
 * @param {string} imageId Image ID
 * @returns {void}
 */
export function getImageLoadObject(imageId: string): void;
/**
 * Removes the image loader associated with a given Id from the cache
 *
 * @param {string} imageId Image ID
 * @returns {void}
 */
export function removeImageLoadObject(imageId: string): void;
/**
 * @typedef {Object} CacheInformation
 * @property {number} maximumSizeInBytes  The maximum size of the cache in bytes
 * @property {number} cacheSizeInBytes Currently occupied space in the cache in bytes
 * @property {number} numberOfImagesCached Number of ImageLoaders in the cache
 * @returns {void}
 */
/**
 * Gets the current state of the cache
 * @returns {void}
 */
export function getCacheInfo(): void;
/**
 * Removes all images from cache
 * @returns {void}
 */
export function purgeCache(): void;
/**
 * Updates the space than an image is using in the cache
 *
 * @param {string} imageId Image ID
 * @param {number} newCacheSize New image size
 * @returns {void}
 */
export function changeImageIdCacheSize(imageId: string, newCacheSize: number): void;
export const cachedImages: any[];
declare namespace _default {
    export { imageCacheDict as imageCache };
    export { cachedImages };
    export { setMaximumSizeBytes };
    export { putImageLoadObject };
    export { getImageLoadObject };
    export { removeImageLoadObject };
    export { getCacheInfo };
    export { purgeCache };
    export { changeImageIdCacheSize };
}
export default _default;
export type CacheInformation = {
    /**
     * The maximum size of the cache in bytes
     */
    maximumSizeInBytes: number;
    /**
     * Currently occupied space in the cache in bytes
     */
    cacheSizeInBytes: number;
    /**
     * Number of ImageLoaders in the cache
     */
    numberOfImagesCached: number;
};
declare const imageCacheDict: {};
