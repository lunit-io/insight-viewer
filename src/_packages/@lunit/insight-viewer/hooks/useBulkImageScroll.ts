import { useEffect } from 'react';
import { CornerstoneBulkImage } from '../image/types';

interface BulkImageScrollParams {
  image: CornerstoneBulkImage;
  element: HTMLElement | null;
  enabled?: boolean;
}

export function useBulkImageScroll({image, element, enabled = true}: BulkImageScrollParams) {
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