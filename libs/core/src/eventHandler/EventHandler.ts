import { EVENTS } from '@cornerstonejs/core';

const { IMAGE_RENDERED, CAMERA_MODIFIED, STACK_NEW_IMAGE } = EVENTS;

/**
 * This is the class that handles various cornerstone events.
 *
 * example code: https://github.com/cornerstonejs/cornerstone3D/blob/642bbba3dbb8ded72994e30759d029bed7adfd04/packages/core/examples/stackEvents/index.ts#L70
 */
export class EventHandler {
  private addImageRenderedEventListener = (
    element: HTMLDivElement,
    callback: () => void
  ) => {
    element.addEventListener(IMAGE_RENDERED, callback);
  };

  private addStackViewportNewStackEventListener = (
    element: HTMLDivElement,
    callback: () => void
  ) => {
    element.addEventListener(STACK_NEW_IMAGE, callback);
  };

  private addCameraModifiedEventListener = (
    element: HTMLDivElement,
    callback: () => void
  ) => {
    element.addEventListener(CAMERA_MODIFIED, callback);
  };

  init = ({
    element,
    imageRenderCallback,
    cameraModifiedCallback,
    stackNewStackCallback,
  }: {
    element: HTMLDivElement;
    imageRenderCallback: () => void;
    cameraModifiedCallback?: () => void;
    stackNewStackCallback?: () => void;
  }) => {
    this.addImageRenderedEventListener(element, () => {
      imageRenderCallback();
    });

    this.addCameraModifiedEventListener(element, () => {
      cameraModifiedCallback?.();
    });

    // Trigger only when image changes
    this.addStackViewportNewStackEventListener(element, () => {
      stackNewStackCallback?.();
    });
  };
}
