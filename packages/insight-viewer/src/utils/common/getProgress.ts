/**
 * Calculate progress status value for single/multiple image(s) fetching.
 * @param loadedCount The count of loaded images.
 * @param totalCount The length of images to load.
 * @param progress The progress status of image to be loading. Repeat 0 to 100 for each new image fetching.
 * @returns Total progress. When all images are loaded, return 100. Otherwise, return rounded down value.
 */
export function getProgress({
  loadedCount,
  totalCount,
  progress,
}: {
  loadedCount: number
  totalCount: number
  progress: number
}): number {
  const calculated = (loadedCount * 100 + (progress ?? 0)) * (1 / totalCount)
  return loadedCount === totalCount ? 100 : Math.floor(calculated)
}
