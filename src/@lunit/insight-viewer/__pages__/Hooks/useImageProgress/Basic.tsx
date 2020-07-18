import {
  CornerstoneImage,
  CornerstoneSeriesImage,
  installWADOImageLoader,
  unloadImage,
  useImageProgress,
} from '@lunit/insight-viewer';
import React, { useMemo } from 'react';
import series from '../../../__fixtures__/series.json';

installWADOImageLoader();

export default () => {
  const image: CornerstoneImage = useMemo(
    () =>
      new CornerstoneSeriesImage(
        series.map((p) => `wadouri:https://lunit-io.github.io/frontend-fixtures/dcm-files/series/${p}`),
        { unload: unloadImage },
      ),
    [],
  );

  const progress = useImageProgress(image);

  return (
    <div>
      <p>{progress || 'Done'}</p>
    </div>
  );
};
