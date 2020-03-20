import {
  CornerstoneImage,
  CornerstoneSingleImage,
  InsightViewer,
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

  return (
    <InsightViewer
      width={400}
      height={500}
      invert={false} // 색상을 반전한다
      flip={false} // 이미지를 좌우로 뒤집는다
      pan={true} // Pan Interaction을 활성화 한다
      adjust={false} // Adjust Interaction을 활성화 한다 (Pan과 동시에 사용할 수 없다)
      zoom={true} // Zoom Interaction을 활성화 한다
      resetTime={Date.now()} // 이 값이 변경되면 Pan, Adjust, Zoom 상태가 초기화 된다
      image={image}
      updateCornerstoneRenderData={() => {}}
    />
  );
};
