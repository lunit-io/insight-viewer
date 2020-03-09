import { CornerstoneSeriesImage } from '@lunit/insight-viewer';
import { useEffect, useState } from 'react';

export function useSeriesImagePosition(image: CornerstoneSeriesImage): { current: number; end: number } {
  const [result, setResult] = useState<{ current: number; end: number }>(() => ({
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

/** @deprecated use useSeriesImagePosition() */
export const useBulkImagePosition = useSeriesImagePosition;
