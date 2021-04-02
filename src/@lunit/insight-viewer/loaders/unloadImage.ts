export function unloadImage(imageId: string | string[] | null) {
  function unload(id: string) {
    if (/^wadouri:/.test(id)) {
      cornerstoneWADOImageLoader?.wadouri?.dataSetCacheManager?.unload(id);
    }
  }

  if (Array.isArray(imageId)) {
    imageId.forEach((id) => unload(id));
  } else if (typeof imageId === 'string') {
    unload(imageId);
  }
}

/** @deprecated use instead of unloadImage() */
export const unloadWADOImage = unloadImage;
