import { EVENTS } from '@cornerstonejs/core';

import type { Types } from '@cornerstonejs/core';

const { IMAGE_RENDERED } = EVENTS;

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
    element.addEventListener(IMAGE_RENDERED, ((
      _: Types.EventTypes.ImageRenderedEvent
    ) => {
      callback();
    }) as EventListener);
  };

  init = (element: HTMLDivElement, callback: () => void) => {
    this.addImageRenderedEventListener(element, callback);
  };
}
