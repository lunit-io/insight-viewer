import { CornerstoneSeriesImage } from '@lunit/insight-viewer';
import { useEffect } from 'react';

interface BulkImageScrollParams {
  image: CornerstoneSeriesImage;
  element: HTMLElement | null;
  enabled?: boolean;
}

export function useSeriesImageScroll({ image, element, enabled = true }: BulkImageScrollParams) {
  useEffect(() => {
    if (!element || enabled !== true) {
      return () => {
        // DO NOTHING
      };
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
