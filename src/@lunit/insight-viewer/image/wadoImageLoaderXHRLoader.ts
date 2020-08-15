/* eslint-disable @typescript-eslint/no-explicit-any */

interface Params {
  deferred?: {
    resolve: (xhrResponse: any) => void;
    reject: (error: Error) => void;
  };

  url?: string;
  imageId?: string;
}

export const wadoImageLoaderXHRLoader = (getCancel?: (cancel: () => void) => void) => (
  url: string,
  imageId: string,
  headers: { [key: string]: string } = {},
  params: Params = {},
) => {
  const { cornerstone } = cornerstoneWADOImageLoader.external;
  const xhr: XMLHttpRequest = new XMLHttpRequest();

  return new Promise<any>((resolve: (xhrResponse: any) => void, reject: (error: Error) => void) => {
    xhr.open('get', url, true);
    xhr.responseType = 'arraybuffer';

    Object.keys(headers).forEach((key) => {
      xhr.setRequestHeader(key, headers[key]);
    });

    params.deferred = {
      resolve,
      reject,
    };
    params.url = url;
    params.imageId = imageId;

    function cancel() {
      try {
        xhr.abort();
      } catch (error) {}
    }

    if (typeof getCancel === 'function') {
      getCancel(cancel);
    }

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        resolve(xhr.response);
      }
    };

    // Event triggered when downloading an image starts
    xhr.onloadstart = () => {
      const eventData = {
        url,
        imageId,
      };

      if (cornerstone) {
        cornerstone.triggerEvent(cornerstone.events, 'cornerstoneimageloadstart', eventData);
      }
    };

    // Event triggered when downloading an image ends
    xhr.onloadend = () => {
      const eventData = {
        url,
        imageId,
      };

      cornerstone.triggerEvent(cornerstone.events, 'cornerstoneimageloadend', eventData);
    };

    // Event triggered when downloading an image progresses
    xhr.onprogress = ({ loaded, lengthComputable, total }: ProgressEvent) => {
      let percentComplete;

      if (lengthComputable) {
        percentComplete = Math.round((loaded / total) * 100);
      }

      // Event
      const eventData = {
        url,
        imageId,
        loaded,
        total,
        percentComplete,
      };

      cornerstone.triggerEvent(cornerstone.events, 'cornerstoneimageloadprogress', eventData);
    };

    xhr.send();
  });
};
