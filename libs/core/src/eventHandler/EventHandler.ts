import { EVENTS } from '@cornerstonejs/core';
import { Enums } from '@cornerstonejs/tools';

const { IMAGE_RENDERED } = EVENTS;
const { ANNOTATION_RENDERED } = Enums.Events;

/**
 * This is the class that handles various cornerstone events.
 *
 * example code: https://github.com/cornerstonejs/cornerstone3D/blob/642bbba3dbb8ded72994e30759d029bed7adfd04/packages/core/examples/stackEvents/index.ts#L70
 */
export class EventHandler {
  private imageRenderedCallback: (() => void) | null = null;
  private annotationRenderedCallback: (() => void) | null = null;

  private addImageRenderedEventListener = (
    element: HTMLDivElement,
    callback: () => void
  ) => {
    if (this.imageRenderedCallback) {
      element.removeEventListener(IMAGE_RENDERED, this.imageRenderedCallback);
    }
    this.imageRenderedCallback = callback;
    element.addEventListener(IMAGE_RENDERED, callback);
  };

  private addAnnotationRenderedEventListener = (
    element: HTMLDivElement,
    callback: () => void
  ) => {
    if (this.annotationRenderedCallback) {
      element.removeEventListener(
        ANNOTATION_RENDERED,
        this.annotationRenderedCallback
      );
    }
    this.annotationRenderedCallback = callback;
    element.addEventListener(ANNOTATION_RENDERED, callback);
  };
  init = (element: HTMLDivElement, callback: () => void) => {
    this.addImageRenderedEventListener(element, callback);
    this.addAnnotationRenderedEventListener(element, callback);
  };
}
