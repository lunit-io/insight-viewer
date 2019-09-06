import { useEffect, useState } from 'react';
import { CornerstoneImage } from '../image/types';

export function useImageProgress(image: CornerstoneImage | null | undefined): number | null {
  const [progress, setProgress] = useState<number | null>(null);
  
  useEffect(() => {
    if (image) {
      const subscription = image.progress.subscribe(nextProgress => {
        setProgress(nextProgress < 1 ? nextProgress : null);
      });
      
      return () => {
        subscription.unsubscribe();
      };
    } else {
      setProgress(null);
    }
  }, [image]);
  
  return progress;
}