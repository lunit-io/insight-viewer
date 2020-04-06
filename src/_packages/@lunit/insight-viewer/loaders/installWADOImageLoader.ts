let installed: boolean = false;

export function installWADOImageLoader() {
  if (installed) return;
  installed = true;

  cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
  cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
  // TODO iPad에서 제대로 안되는 이유 확인
  //cornerstoneWADOImageLoader.webWorkerManager.initialize({
  //maxWebWorkers: navigator.hardwareConcurrency || 4,
  //startWebWorkersOnDemand: false,
  //taskConfiguration: {
  //  decodeTask: {
  //    initializeCodecsOnStartup: true,
  //  },
  //},
  //});
}
