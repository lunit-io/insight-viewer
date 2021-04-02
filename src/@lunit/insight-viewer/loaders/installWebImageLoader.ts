let installed: boolean = false;

export function installWebImageLoader() {
  if (installed) return;
  installed = true;

  cornerstoneWebImageLoader.external.cornerstone = cornerstone;
}
