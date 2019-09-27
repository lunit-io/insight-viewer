import {
  CornerstoneImage,
  CornerstoneSeriesImage,
  CornerstoneSingleImage,
  InsightViewer,
  InsightViewerContainer,
  installWADOImageLoader,
  ProgressCollector,
  ProgressViewer,
  unloadWADOImage,
  useContainerStyleOfProgressViewersInactivity,
  useInsightViewerSync,
  useProgressViewersActivity,
} from '@lunit/insight-viewer';
import { storiesOf } from '@storybook/react';
import React, { CSSProperties, useMemo } from 'react';
import { useController, withTestController } from './decorators/withTestController';
import series from './series.json';

installWADOImageLoader();

function Sample() {
  // <ProgressCollector>는 하위의 <ProgressViewer>들의 상태를 수집한다
  return (
    <ProgressCollector>
      <Container/>
    </ProgressCollector>
  );
}

function Container() {
  const image1: CornerstoneImage = useMemo(() => new CornerstoneSingleImage(`wadouri:https://lunit-io.github.io/frontend-fixtures/dcm-files/series/CT000010.dcm`, {unload: unloadWADOImage}), []);
  const image2: CornerstoneImage = useMemo(() => new CornerstoneSingleImage(`wadouri:https://lunit-io.github.io/frontend-fixtures/dcm-files/series/CT000020.dcm`, {unload: unloadWADOImage}), []);
  const image3: CornerstoneImage = useMemo(() => new CornerstoneSingleImage(`wadouri:https://lunit-io.github.io/frontend-fixtures/dcm-files/series/CT000030.dcm`, {unload: unloadWADOImage}), []);
  const image4: CornerstoneImage = useMemo(() => new CornerstoneSeriesImage(series.map(p => `wadouri:https://lunit-io.github.io/frontend-fixtures/dcm-files/series/${p}`), {unload: unloadWADOImage}), []);
  
  // <ProgressCollector>에서 수집한 정보를 얻을 수 있다
  const progressActivity: boolean = useProgressViewersActivity();
  // 혹은 <ProgressViewer>가 동작중일때 비활성을 처리할 Style을 만들 수 있다
  const containerDisabledStyle: CSSProperties = useContainerStyleOfProgressViewersInactivity({pointerEvents: 'none'});
  
  return (
    <div style={containerDisabledStyle}>
      <div style={{display: 'flex'}}>
        <Component image={image1}/>
        <Component image={image2}/>
        <Component image={image3}/>
        <Component image={image4}/>
      </div>
      <p>
        {
          progressActivity
            ? '<ProgressViewer>가 하나 이상 작동 중입니다!!!'
            : '동작중인 <ProgressViewer>가 없습니다!!!'
        }
      </p>
    </div>
  );
}

function Component({image}: {image: CornerstoneImage}) {
  const resetTime: number = Date.now();
  
  const {
    width,
    height,
    control,
    wheel,
    invert,
    flip,
  } = useController();
  
  const {updateCornerstoneRenderData} = useInsightViewerSync();
  
  return (
    <InsightViewerContainer width={width} height={height}>
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
      {/* 이 <ProgressViewer>가 <ProgressCollector>에 수집된다 */}
      <ProgressViewer image={image}
                      width={width}
                      height={height}/>
    </InsightViewerContainer>
  );
}

storiesOf('insight-viewer', module)
  .addDecorator(withTestController({
    width: [300, 200, 500],
    height: [400, 300, 600],
    control: ['pan', ['none', 'pen', 'pan', 'adjust']],
    wheel: ['zoom', ['none', 'zoom']],
    flip: false,
    invert: false,
  }))
  .add('<ProgressCollector>', () => <Sample/>);