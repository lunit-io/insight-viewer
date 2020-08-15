import { isTouchDevice } from '@lunit/is-touch-device';
import { useEffect } from 'react';

export function useTouchDeviceLayoutFixer() {
  useEffect(() => {
    function preventPinchZoom(event: TouchEvent) {
      if (event.touches.length > 1) {
        event.preventDefault();
      }
    }

    function preventScroll() {
      if (document.documentElement.scrollTop !== 0) {
        document.documentElement.scrollTop = 0;
      }
    }

    let intervalId: number | null = null;

    if (isTouchDevice()) {
      document.addEventListener('touchmove', preventPinchZoom, { passive: false });
      document.addEventListener('scroll', preventScroll);

      intervalId = setInterval(() => {
        preventScroll();
      }, 1000);
    }

    return () => {
      document.removeEventListener('touchmove', preventPinchZoom);
      document.removeEventListener('scroll', preventScroll);
      if (intervalId) clearInterval(intervalId);
    };
  }, []);
}
