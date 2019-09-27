import {
  CornerstoneImage,
  CornerstoneSingleImage,
  InsightViewer,
  installWADOImageLoader,
  unloadWADOImage,
  useInsightViewerSync,
} from '@lunit/insight-viewer';
import { storiesOf } from '@storybook/react';
import React, { useMemo } from 'react';
import { useController, withTestController } from './decorators/withTestController';

// cornerstoneWADOImageLoader 초기화
installWADOImageLoader();

function Sample() {
  // <InsightViewer resetTime={}>을 변경하면 Viewport 등 cornerstone-core 관련 속성들이 초기화 된다
  const resetTime: number = Date.now();
  
  // unload 옵션은 위에 선언된 installWADOImageLoader()와 함께 동작한다
  // CornerstoneImage 객체를 unload 할때 wado image loader의 unload 동작을 하게 된다
  const image: CornerstoneImage = useMemo(() => new CornerstoneSingleImage(`wadouri:https://lunit-io.github.io/frontend-fixtures/dcm-files/series/CT000010.dcm`, {unload: unloadWADOImage}), []);
  
  // addDecorator(withTestController())의 값을 받는다
  const {
    width,
    height,
    control,
    wheel,
    invert,
    flip,
  } = useController();
  
  const {
    updateCornerstoneRenderData,
  } = useInsightViewerSync();
  
  return (
    <InsightViewer width={width}
                   height={height}
                   invert={invert}
                   flip={flip}
                   pan={control === 'pan'}
                   adjust={control === 'adjust'}
                   zoom={wheel === 'zoom'}
                   resetTime={resetTime}
                   image={image}
                   updateCornerstoneRenderData={updateCornerstoneRenderData}/>
  );
}

storiesOf('insight-viewer', module)
  .addDecorator(withTestController({
    width: [600, 400, 1000],
    height: [700, 400, 1000],
    control: ['pan', ['none', 'pan', 'adjust']],
    wheel: ['zoom', ['none', 'zoom']],
    flip: false,
    invert: false,
  }))
  .add('<InsightViewer>', () => <Sample/>);