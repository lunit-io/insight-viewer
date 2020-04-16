import {
  CornerstoneImage,
  CornerstoneSingleImage,
  CornerstoneViewer,
  installWADOImageLoader,
  unloadImage,
  useViewerInteractions,
} from '@lunit/insight-viewer';
import React, { useMemo } from 'react';

installWADOImageLoader();

export default () => {
  const image: CornerstoneImage = useMemo(
    () =>
      new CornerstoneSingleImage(`wadouri:https://fixtures.front.lunit.io/dcm-files/series/CT000010.dcm`, {
        unload: unloadImage,
      }),
    [],
  );

  const interactions = useViewerInteractions(['pan', 'zoom']);

  return (
    <CornerstoneViewer
      width={400}
      height={500}
      invert={false} // 색상을 반전한다
      flip={false} // 이미지를 좌우로 뒤집는다
      interactions={interactions} // 활성화 시킬 Interaction
      resetTime={Date.now()} // 이 값이 변경되면 Pan, Adjust, Zoom 상태가 초기화 된다
      image={image}
      updateCornerstoneRenderData={() => {}}
    />
  );
};
