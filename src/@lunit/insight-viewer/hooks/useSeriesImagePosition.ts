import { CornerstoneSequenceImage } from '@lunit/insight-viewer';
import { useEffect, useState } from 'react';

interface SeriesImagePosition {
  /** 현재 Image 위치 */
  current: number;

  /** 총 Image 갯수 */
  end: number;
}

export function useSeriesImagePosition(
  image: CornerstoneSequenceImage,
): SeriesImagePosition {
  const [result, setResult] = useState<{ current: number; end: number }>(
    () => ({
      current: image.getIndex(),
      end: image.length() - 1,
    }),
  );

  useEffect(() => {
    const subscription = image.index.subscribe((current: number) => {
      setResult((prevResult) => {
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
