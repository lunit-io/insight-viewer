import { CornerstoneSeriesImage } from '@lunit/insight-viewer';
import { useEffect } from 'react';

interface SeriesImageScrollParams {
  image: CornerstoneSeriesImage;

  /** Wheel Event를 처리할 EventTarget */
  element: HTMLElement | null;

  /** User Interaction 활성화 여부 */
  enabled?: boolean;
}

export function useSeriesImageScroll({ image, element, enabled = true }: SeriesImageScrollParams) {
  useEffect(() => {
    if (!element || enabled !== true) {
      return () => {};
    }

    function handler(event: WheelEvent) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();

      if (event.deltaY > 0) {
        image.prev();
      } else if (event.deltaY < 0) {
        image.next();
      }
    }

    element.addEventListener('wheel', handler);

    return () => {
      element.removeEventListener('wheel', handler);
    };
  }, [image, element, enabled]);
}

/** @deprecated use useSeriesImageScroll */
export const useBulkImageScroll = useSeriesImageScroll;
