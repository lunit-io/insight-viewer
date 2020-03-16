import { useEffect, useState } from 'react';
import { CornerstoneImage } from '../image/types';

/**
 * CornerstoneImage의 Loading 상태를 확인하기 위해 사용한다.
 *
 * @return `number`는 loading이 진행중이고, `null`은 loading이 진행중이 아니다. `null`이 오는 경우 Progress UI를 감추면 된다.
 */
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
