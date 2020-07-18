import { CornerstoneImage, CornerstoneSingleImage, installWADOImageLoader, unloadImage } from '@lunit/insight-viewer';
import React, { useEffect, useMemo, useState } from 'react';

installWADOImageLoader();

export default () => {
  const [log, setLog] = useState<string[]>(() => []);

  const image: CornerstoneImage = useMemo(
    () =>
      new CornerstoneSingleImage(`wadouri:https://lunit-io.github.io/frontend-fixtures/dcm-files/series/CT000010.dcm`, {
        unload: unloadImage,
      }),
    [],
  );

  useEffect(() => {
    // progress 정보를 받는다
    const progressSubscription = image.progress.subscribe((progress: number) => {
      setLog((prevLog) => [...prevLog, `[progress]: ${Math.floor(progress * 100)}%`]);
    });

    // image 정보를 받는다
    const imageSubscription = image.image.subscribe((cornerstoneImage: cornerstone.Image | null) => {
      console.warn('cornerstoneImage:', cornerstoneImage);
      setLog((prevLog) => [...prevLog, `[image]: ${cornerstoneImage?.imageId}`]);
    });

    return () => {
      progressSubscription.unsubscribe();
      imageSubscription.unsubscribe();
    };
  }, [image]);

  return (
    <ul style={{ fontSize: 11 }}>
      {log.map((line, i) => (
        <li key={i}>{line}</li>
      ))}
    </ul>
  );
};
