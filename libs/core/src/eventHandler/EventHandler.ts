import { EVENTS } from '@cornerstonejs/core';

const { IMAGE_RENDERED, STACK_NEW_IMAGE } = EVENTS;

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

  init = ({
    element,
    imageRenderCallback,
    viewportChangeCallback,
    stackNewStackCallback,
  }: {
    element: HTMLDivElement;
    imageRenderCallback: () => void;
    viewportChangeCallback?: () => void;
    stackNewStackCallback?: () => void;
  }) => {
    this.addImageRenderedEventListener(element, () => {
      imageRenderCallback();
      viewportChangeCallback?.();
    });

    // Trigger only when image changes
    this.addStackViewportNewStackEventListener(element, () => {
      stackNewStackCallback?.();
    });
  };
}
