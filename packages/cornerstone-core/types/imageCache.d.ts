import { ImageLoadObject } from "./enabledElements";

/**
 * Sets the maximum size of cache and purges cache contents if necessary.
 *
 * @param numBytes The maximun size that the cache should occupy.
 */
export function setMaximumSizeBytes(numBytes: number): void;
/**
 * Puts a new image loader into the cache
 *
 * @param imageId ImageId of the image loader
 * @param imageLoadObject The object that is loading or loaded the image
 */
export function putImageLoadObject(imageId: string, imageLoadObject: ImageLoadObject): void;
/**
 * Retuns the object that is loading a given imageId
 *
 * @param imageId Image ID
 */
export function getImageLoadObject(imageId: string): void;
/**
 * Removes the image loader associated with a given Id from the cache
 *
 * @param imageId Image ID
 */
export function removeImageLoadObject(imageId: string): void;
/**
 * @property {number} maximumSizeInBytes  The maximum size of the cache in bytes
 * @property {number} cacheSizeInBytes Currently occupied space in the cache in bytes
 * @property {number} numberOfImagesCached Number of ImageLoaders in the cache
 */
export interface CacheInformation {
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
}
/**
 * Gets the current state of the cache
 */
export function getCacheInfo(): void;
/**
 * Removes all images from cache
 */
export function purgeCache(): void;
/**
 * Updates the space than an image is using in the cache
 *
 * @param imageId Image ID
 * @param newCacheSize New image size
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

declare const imageCacheDict: {};
