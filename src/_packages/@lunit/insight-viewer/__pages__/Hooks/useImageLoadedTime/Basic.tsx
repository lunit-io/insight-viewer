import {
  CornerstoneImage,
  CornerstoneSingleImage,
  installWADOImageLoader,
  useImageLoadedTime,
} from '@lunit/insight-viewer';
import React, { useMemo } from 'react';
import series from '../../../__fixtures__/series.json';

installWADOImageLoader();

export default () => {
  const images: CornerstoneImage[] = useMemo(
    () =>
      series
        .slice(0, 5)
        .map(
          p => new CornerstoneSingleImage(`wadouri:https://lunit-io.github.io/frontend-fixtures/dcm-files/series/${p}`),
        ),
    [],
  );

  const progresses = useMemo(() => images.map(image => image.progress), [images]);

  const imageLoadedTime = useImageLoadedTime(progresses);

  return (
    <div>
      <p>{imageLoadedTime ? `Image loaded at ${imageLoadedTime.toDateString()}` : 'in progress...'}</p>
    </div>
  );
};
