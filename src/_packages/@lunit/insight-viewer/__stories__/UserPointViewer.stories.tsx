import {
  Contour,
  CornerstoneImage,
  CornerstoneSingleImage,
  InsightViewer,
  InsightViewerContainer,
  installWADOImageLoader,
  Point,
  ProgressViewer,
  unloadWADOImage,
  useInsightViewerSync,
  UserPointViewer,
  useUserContour,
} from '@lunit/insight-viewer';
import { storiesOf } from '@storybook/react';
import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useController, withTestController } from './decorators/withTestController';

installWADOImageLoader();

function labelFunction({id}: Contour): string {
  return 'p' + id;
}

const initialContours: Omit<Contour, 'id'>[] = [
  {
    confidenceLevel: 1,
    label: labelFunction,
    polygon: [[100, 200]],
  },
  {
    confidenceLevel: 1,
    label: labelFunction,
    polygon: [[200, 200]],
  },
];

const resetTime: number = Date.now();

function Sample() {
  const image: CornerstoneImage = useMemo(() => new CornerstoneSingleImage(`wadouri:https://lunit-io.github.io/frontend-fixtures/dcm-files/series/CT000010.dcm`, {unload: unloadWADOImage}), []);
  
  const {
    width,
    height,
    control,
    wheel,
    invert,
    flip,
  } = useController();
  
  const [interactionElement, setInteractionElement] = useState<HTMLElement | null>(null);
  
  // <InsightViewer> 내부의 Canvas Render를 외부의 다른 Component들에 동기화 시키기 위한 Hook
  const {
    cornerstoneRenderData,
    updateCornerstoneRenderData,
  } = useInsightViewerSync();
  
  // Annotation (사용자 Contour)를 다루기 위한 Hook
  const {
    contours,
    focusedContour,
    addContour: _addContour,
    removeContour,
    focusContour,
  } = useUserContour({
    mode: 'point',
    initialContours,
  });
  
  const addContour = useCallback((polygon: Point[], confidenceLevel: number, label?: ((contour: Contour) => string) | string, attrs?: {[attr: string]: string}): Contour | null => {
    return _addContour(polygon, confidenceLevel, labelFunction, attrs);
  }, [_addContour]);
  
  return (
    <Div>
      <InsightViewerContainer ref={setInteractionElement} width={width} height={height}>
        <InsightViewer width={width}
                       height={height}
                       invert={invert}
                       flip={flip}
                       pan={control === 'pan' && interactionElement}
                       adjust={control === 'adjust' && interactionElement}
                       zoom={wheel === 'zoom' && interactionElement}
                       resetTime={resetTime}
                       image={image}
                       updateCornerstoneRenderData={updateCornerstoneRenderData}/>
        {
          contours &&
          cornerstoneRenderData &&
          <UserPointViewer width={width}
                           height={height}
                           contours={contours}
                           interact={control === 'pen'}
                           focusedContour={focusedContour}
                           onFocus={focusContour}
                           onAdd={polygon => addContour(polygon, 0)}
                           onRemove={removeContour}
                           cornerstoneRenderData={cornerstoneRenderData}/>
        }
        <ProgressViewer image={image}
                        width={width}
                        height={height}/>
      </InsightViewerContainer>
      
      <div>
        <pre>
          {JSON.stringify(focusedContour, null, 2)}
        </pre>
      </div>
    </Div>
  );
}

storiesOf('insight-viewer', module)
  .addDecorator(withTestController({
    width: [600, 400, 1000],
    height: [700, 400, 1000],
    control: ['pen', ['none', 'pen', 'pan', 'adjust']],
    wheel: ['zoom', ['none', 'zoom']],
    flip: false,
    invert: false,
  }))
  .add('<UserPointViewer>', () => <Sample/>);

const Div = styled.div`
  display: flex;
`;
