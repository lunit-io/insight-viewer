import * as cornerstone from 'cornerstone-core';
import * as cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
import * as dicomParser from 'dicom-parser';

let installed: boolean = false;

export function installWADOImageLoader() {
  if (installed) return;
  installed = true;

  cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
  cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
  cornerstoneWADOImageLoader.webWorkerManager.initialize({
    maxWebWorkers: navigator.hardwareConcurrency || 4,
    startWebWorkersOnDemand: false,
    webWorkerPath: 'cornerstoneWADOImageLoaderWebWorker.min.js',
    taskConfiguration: {
      decodeTask: {
        initializeCodecsOnStartup: true,
        codecsPath: 'cornerstoneWADOImageLoaderCodecs.min.js',
        //usePDFJS: false,
      },
    },
  });
}

export function unloadWADOImage(imageId: string | string[] | null) {
  if (Array.isArray(imageId)) {
    imageId.forEach(id => cornerstoneWADOImageLoader.wadouri.dataSetCacheManager.unload(id));
  } else if (typeof imageId === 'string') {
    cornerstoneWADOImageLoader.wadouri.dataSetCacheManager.unload(imageId);
  }
}
