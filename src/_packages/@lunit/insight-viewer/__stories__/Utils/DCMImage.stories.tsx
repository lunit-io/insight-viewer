import {
  CornerstoneImage,
  CornerstoneSingleImage,
  DCMImage,
  installWADOImageLoader,
  unloadWADOImage,
  withInsightViewerStorybookGlobalStyle,
} from '@lunit/insight-viewer';
import { withOPTComponentsStorybookGlobalStyle } from '@lunit/opt-components';
import React, { useMemo } from 'react';

installWADOImageLoader();

export default {
  title: 'insight-viewer/Utils',
  decorators: [withInsightViewerStorybookGlobalStyle, withOPTComponentsStorybookGlobalStyle],
};

export const DCMImageSample = () => {
  const images: CornerstoneImage[] = useMemo(() => {
    return [
      'wadouri:https://lunit-frontend-fixtures.netlify.com/dcm-files/series/CT000010.dcm',
      `wadouri:https://lunit-frontend-fixtures.netlify.com/dcm-files/series/CT000011.dcm`,
      `wadouri:https://lunit-frontend-fixtures.netlify.com/dcm-files/series/CT000012.dcm`,
      `wadouri:https://lunit-frontend-fixtures.netlify.com/dcm-files/series/CT000013.dcm`,
    ].map(imageId => new CornerstoneSingleImage(imageId, { unload: unloadWADOImage }));
  }, []);

  // `<DCMImage>`를 사용해서 좀 더 간단하게 Dicom File을 출력할 수 있다.
  // 하지만, `.dcm` 파일의 용량 및 렌더링 비용이 너무 크기 때문에
  // 가능하다면 `.jpg` 썸네일 이미지를 만들어서 사용하는 것이 더 좋다.

  return (
    <ul>
      {images.map((image, i) => (
        <li key={'image' + i}>
          <DCMImage cornerstoneImage={image} width={120} height={150} />
        </li>
      ))}
    </ul>
  );
};

DCMImageSample.story = {
  name: '<DCMImage>',
};
