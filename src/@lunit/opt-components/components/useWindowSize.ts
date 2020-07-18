import { useEffect, useState } from 'react';

export function useWindowSize(): [number, number] {
  const [size, setSize] = useState<[number, number]>(() => [window.innerWidth, window.innerHeight]);

  useEffect(() => {
    function handler() {
      setSize([window.innerWidth, window.innerHeight]);
    }

    window.addEventListener('resize', handler);

    return () => {
      window.removeEventListener('resize', handler);
    };
  }, []);

  return size;
}
