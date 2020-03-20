import {
  CornerstoneImage,
  CornerstoneSingleImage,
  InsightViewer,
  InsightViewerControllerOptions,
  InsightViewerTestController,
  installWADOImageLoader,
  unloadImage,
} from '@lunit/insight-viewer';
import React, { useMemo } from 'react';

installWADOImageLoader();

const controllerOptions: InsightViewerControllerOptions = {
  width: [600, 400, 1000],
  height: [700, 400, 1000],
  control: ['pan', ['none', 'pan', 'adjust']],
  wheel: ['zoom', ['none', 'zoom']],
  flip: [false],
  invert: [false],
};

export default () => {
  const image: CornerstoneImage = useMemo(
    () =>
      new CornerstoneSingleImage(`wadouri:https://lunit-io.github.io/frontend-fixtures/dcm-files/series/CT000010.dcm`, {
        unload: unloadImage,
      }),
    [],
  );

  return (
    <InsightViewerTestController options={controllerOptions}>
      {({ width, height, invert, flip, control, wheel, resetTime }) => (
        <InsightViewer
          width={width}
          height={height}
          invert={invert} // 색상을 반전한다
          flip={flip} // 이미지를 좌우로 뒤집는다
          pan={control === 'pan'} // Pan Interaction을 활성화 한다
          adjust={control === 'adjust'} // Adjust Interaction을 활성화 한다 (Pan과 동시에 사용할 수 없다)
          zoom={wheel === 'zoom'} // Zoom Interaction을 활성화 한다
          resetTime={resetTime} // 이 값이 변경되면 Pan, Adjust, Zoom 상태가 초기화 된다
          image={image}
          updateCornerstoneRenderData={() => {}}
        />
      )}
    </InsightViewerTestController>
  );
};
