import { useEffect, useState } from 'react';
import { CornerstoneBulkImage } from '../image/types';

export function useBulkImagePosition(image: CornerstoneBulkImage): {current: number, end: number} {
  const [result, setResult] = useState<{current: number, end: number}>(() => ({
    current: image.getIndex(),
    end: image.length() - 1,
  }));
  
  useEffect(() => {
    const subscription = image.index.subscribe((current: number) => {
      setResult(prevResult => {
        return {
          ...prevResult,
          current,
          end: image.length() - 1,
        };
      });
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, [image]);
  
  return result;
}