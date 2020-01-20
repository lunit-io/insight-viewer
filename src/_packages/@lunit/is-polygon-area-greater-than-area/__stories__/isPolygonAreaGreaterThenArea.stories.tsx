import {
  ContourDrawer,
  CornerstoneImage,
  CornerstoneSingleImage,
  InsightViewer,
  InsightViewerContainer,
  installWADOImageLoader,
  Point,
  unloadWADOImage,
  useInsightViewerSync, withInsightViewerStorybookGlobalStyle,
} from '@lunit/insight-viewer';
import { isPolygonAreaGreaterThanArea } from '@lunit/is-polygon-area-greater-than-area';
import { withOPTComponentsStorybookGlobalStyle } from '@lunit/opt-components';
import { storiesOf } from '@storybook/react';
import React, { ReactNode, useCallback, useState } from 'react';

installWADOImageLoader();

const resetTime: number = Date.now();
const image: CornerstoneImage = new CornerstoneSingleImage(`wadouri:https://elegant-jackson-8b43a6.netlify.com/dcm-files/series/CT000010.dcm`, {unload: unloadWADOImage});

function doNothing() {
  // DO NOTHING
}

function Sample() {
  const width: number = 400;
  const height: number = 500;
  
  const [interactionElement, setInteractionElement] = useState<HTMLElement | null>(null);
  
  const {
    cornerstoneRenderData,
    updateCornerstoneRenderData,
  } = useInsightViewerSync();
  
  const [checkResult, setCheckResult] = useState<ReactNode>(null);
  
  const check = useCallback((polygon: Point[]) => {
    const result: boolean = isPolygonAreaGreaterThanArea(polygon);
    
    setCheckResult((
      <div>
        <h3><span role="img" aria-label="polygon">🧬</span> POLYGON</h3>
        <pre><code>{JSON.stringify(polygon)}</code></pre>
        <p><span role="img" aria-label="question">🤷‍♂️</span> IS GREATER THAN AREA({100})? → {result ? 'YES' : 'NO'}
        </p>
      </div>
    ));
  }, []);
  
  return (
    <div>
      <InsightViewerContainer ref={setInteractionElement} width={width} height={height}>
        <InsightViewer width={width}
                       height={height}
                       invert={false}
                       flip={false}
                       pan={false}
                       adjust={false}
                       zoom={false}
                       resetTime={resetTime}
                       image={image}
                       updateCornerstoneRenderData={updateCornerstoneRenderData}/>
        {
          cornerstoneRenderData &&
          <ContourDrawer width={width}
                         height={height}
                         contours={[]}
                         draw={interactionElement}
                         onFocus={doNothing}
                         onAdd={check}
                         onRemove={doNothing}
                         cornerstoneRenderData={cornerstoneRenderData}/>
        }
      </InsightViewerContainer>
      <div>
        <pre><code>{checkResult}</code></pre>
      </div>
    </div>
  );
}

storiesOf('in-polygon-area-greater-than-area', module)
  .addDecorator(withOPTComponentsStorybookGlobalStyle)
  .addDecorator(withInsightViewerStorybookGlobalStyle)
  .add('isPolygonAreaGreaterThanArea()', () => <Sample/>);