import {
  CornerstoneImage,
  CornerstoneSingleImage,
  DCMImage,
  installWADOImageLoader,
  unloadImage,
} from '@lunit/insight-viewer';
import React, { useMemo } from 'react';

installWADOImageLoader();

export default () => {
  const image: CornerstoneImage = useMemo(
    () =>
      new CornerstoneSingleImage(`wadouri:https://lunit-frontend-fixtures.netlify.com/dcm-files/series/CT000010.dcm`, {
        unload: unloadImage,
      }),
    [],
  );

  return <DCMImage cornerstoneImage={image} width={200} height={260} />;
};
