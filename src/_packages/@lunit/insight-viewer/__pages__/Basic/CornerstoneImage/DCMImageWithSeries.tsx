import {
  CornerstoneSequenceImage,
  CornerstoneSeriesImage,
  DCMImage,
  installWADOImageLoader,
  unloadImage,
  useSeriesImagePosition,
} from '@lunit/insight-viewer';
import React, { useMemo } from 'react';
import series from '../../../__fixtures__/series.json';

installWADOImageLoader();

export default () => {
  const image: CornerstoneSequenceImage = useMemo(
    () =>
      new CornerstoneSeriesImage(
        series.map((p) => `wadouri:https://static.lunit.io/fixtures/dcm-files/series/${p}`),
        { unload: unloadImage },
      ),
    [],
  );

  const { current, end } = useSeriesImagePosition(image);

  return (
    <>
      <div style={{ position: 'absolute', top: 0, left: 0, padding: 10, backgroundColor: 'gray' }}>
        <button onClick={() => image.prev()}>PREV</button>
        <button onClick={() => image.next()}>NEXT</button>
        <hr />
        <div>
          {current} / {end}
        </div>
      </div>
      <div style={{ marginLeft: 120 }}>
        <DCMImage cornerstoneImage={image} width={200} height={260} />
      </div>
    </>
  );
};
