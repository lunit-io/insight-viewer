import {
  CornerstoneSequenceImage,
  CornerstoneSeriesImage,
  installWADOImageLoader,
  unloadImage,
} from '@lunit/insight-viewer';
import React, { useEffect, useMemo, useState } from 'react';
import series from '../../../__fixtures__/series.json';

installWADOImageLoader();

export default () => {
  const [log, setLog] = useState<string[]>(() => []);

  const image: CornerstoneSequenceImage = useMemo(
    () =>
      new CornerstoneSeriesImage(
        series.map(p => `wadouri:https://lunit-frontend-fixtures.netlify.com/dcm-files/series/${p}`),
        { unload: unloadImage },
      ),
    [],
  );

  const [imageIndex, setImageIndex] = useState<number>(() => image.getIndex());

  useEffect(() => {
    // progress 정보를 받는다
    const progressSubscription = image.progress.subscribe((progress: number) => {
      setLog(prevLog => [...prevLog, `[progress]: ${Math.floor(progress * 100)}%`]);
    });

    // image 정보를 받는다
    const imageSubscription = image.image.subscribe((cornerstoneImage: cornerstone.Image | null) => {
      console.warn('cornerstoneImage:', cornerstoneImage);
      setLog(prevLog => [...prevLog, `[image]: ${cornerstoneImage?.imageId}`]);
    });

    // index 정보를 받는다
    const indexSubscription = image.index.subscribe((imageIndex: number) => {
      setImageIndex(imageIndex);
    });

    return () => {
      progressSubscription.unsubscribe();
      imageSubscription.unsubscribe();
      indexSubscription.unsubscribe();
    };
  }, [image]);

  return (
    <>
      <div style={{ position: 'absolute', top: 0, left: 0, padding: 10, backgroundColor: 'gray' }}>
        <button onClick={() => image.prev()}>PREV</button>
        <button onClick={() => image.next()}>NEXT</button>
        <hr />
        <div>
          {imageIndex} / {image.length()}
        </div>
      </div>
      <ul style={{ fontSize: 11, marginLeft: 120 }}>
        {log.map((line, i) => (
          <li key={i}>{line}</li>
        ))}
      </ul>
    </>
  );
};
