cornerstone 등 OPT 기능을 구현하기 위한 여러 graphics layer를 구현한다.

# Install

```sh
npm install @lunit/insight-viewer
```

```json
{
  "scripts": {
    "app:build": "zeroconfig-webapp-scripts build app --static-file-packages @lunit/insight-viewer",
    "app:start": "zeroconfig-webapp-scripts start app --static-file-packages @lunit/insight-viewer" 
  }
}
```

Package 내부에 `public/cornerstoneWADOImageLoaderCodecs.min.js` 파일과 `public/cornerstoneWADOImageLoaderWebWorker.min.js` 파일을 가지고 있고, 이를 App 빌드에 적용하기 위해서는 위와 같이 `--static-file-packages` 옵션을 추가해줘야 한다. 

# API

### Basic Types 

<!-- import types.ts -->

```ts
import { CornerstoneEventData } from 'cornerstone-core';

export type CornerstoneRenderData = Required<Pick<CornerstoneEventData, 'canvasContext' | 'element' | 'enabledElement' | 'image' | 'renderTimeInMs' | 'viewport'>>;

export type Point = [number, number];

export interface ContourInfo {
  confidenceLevel: number; // 0-1
}

// UserContoureViewer와 같은 곳에서 사용된다
export interface Contour extends ContourInfo {
  // 일종의 label 역할을 한다
  id: number;
  polygon: Point[];
  // 존재하는 경우 id 대신 출력된다
  label?: ((contour: Contour) => string) | string;
  dataAttrs?: {[attr: string]: string};
}
```

<!-- importend -->

<!-- import image/types.ts -->

```ts
import { Image } from 'cornerstone-core';
import { Observable } from 'rxjs';

export interface CornerstoneImage {
  readonly image: Observable<Image | null>;
  readonly progress: Observable<number>;
  destroy: () => void;
}

export interface CornerstoneBulkImage extends CornerstoneImage {
  length: () => number;
  readonly index: Observable<number>;
  next: (delta?: number) => void;
  prev: (delta?: number) => void;
  goto: (index: number) => void;
  getIndex: () => number;
}

export interface ProgressEventDetail {
  url: string;
  imageId: string;
  loaded: number;
  total: number;
  percentComplete: number; // 0 ~ 100
}

export function getProgressEventDetail(event: Event): ProgressEventDetail | undefined {
  const detail: object | undefined = event['detail'];
  
  if (
    detail
    && typeof detail['url'] === 'string'
    && typeof detail['imageId'] === 'string'
    && typeof detail['loaded'] === 'number'
    && typeof detail['total'] === 'number'
    && typeof detail['percentComplete'] === 'number'
  ) {
    return detail as ProgressEventDetail;
  }
  
  return undefined;
}
```

<!-- importend -->

### Images

```tsx
new CornerstoneSingleImage(imageId: string, options: { unload: () => void }) // implements CornerstoneImage
new CornerstoneSeriesImage(imageIds: string[], options: { unload: () => void }) // implements CornerstoneBulkImage
```

### Components
```tsx
<InsightViewer width={number}
               height={number}
               image={CornerstoneImage}
               resetTime={number}
               pan={boolean | HTMLElement | null} // true로 들어가면 자체적인 Canvas Element를 사용해서 MouseEvent를 처리하고
               adjust={boolean | HTMLElement | null} // HTMLElement로 들어가면 해당 Element를 사용해서 MouseEvent를 처리한다 
               zoom={boolean | HTMLElement | null}
               invert={boolean}
               flip={boolean} 
               
               updateCornerstoneRenderData={(renderData: CornerstoneRenderData) => void} />
```

```tsx
interface InsightViewerContainerProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

<InsightViewerContainer {...divProps} // <div>를 Forwading하기 때문에 <div>와 동일하게 사용하면 된다
                        width={number}
                        height={number} />

// 내부적으로 width, height 처리와 position: relative 처리된 것 이외에 큰 기능은 없다
```

```tsx
<MachineHeatmapViewer width={number}
                      height={number}
                      posMap={number[][]} // engineResult.posMap을 처리한다
                      threshold={number} 

                      cornerstoneRenderData={CornerstoneRenderData | null}/>
```

```tsx
<UserContourViewer width={number}
                   height={number}
                   contours={Contour[]}
                   focusedContour={Contour | null}

                   cornerstoneRenderData={CornerstoneRenderData | null}

                   canvasStrokeLineWidth?={number}
                   canvasStrokeStyle?={string}
                   canvasFillStyle?={string}
                   canvasFontStyle?={string}
                   canvasFocusedStrokeLineWidth?={number}
                   canvasFocusedStrokeStyle?={string}
                   canvasFocusedFillStyle?={string}
                   canvasFocusedFontStyle?={string} />

// 그려진 annotation 데이터를 보여주는 역할을 하고 

<UserContourDrawer width={number}
                   height={number}
                   contours={Contour[]}
                   draw={boolean | HTMLElement | null}
                   onFocus={(contour: Contour | null) => void}
                   onAdd={(polygon: Point[], event: MouseEvent) => void}
                   onRemove={(contour: Contour) => void} 

                   cornerstoneRenderData={CornerstoneRenderData | null}

                   canvasStokeLineWidght?={number}
                   canvasStokeStyle?={string}
                   canvasFillStyle?={string}/>

// annotation을 그리는 역할을 한다
```

```tsx
<ProgressViewer width={number}
                height={number}
                inProgress?={boolean} // API 동작 등 Progress 동작 여부 
                image?={CornerstoneImage | null | undefined} /> // CornerstoneImage를 넣으면 Image Progress를 같이 처리한다

<ProgressCollector>
  {children}
</ProgressCollector>

// 하위의 <ProgressViewer>를 수집해서 모든 Progress 상태의 Sum을 구하는 역할을 한다

function useProgrssViewersActivity(): boolean
function useContainerStyleOfProgressViewersInactivity(inactivityStyle: CSSProperties): CSSProperties

// 이 두 가지 Hook과 같이 사용된다
```

### Hooks

```ts
useBulkImageScroll({
    image: CornerstoneBulkImage,
    element: HTMLElement | null,
    enabled?: boolean,
})

// WheelEvent로 CornerstoneBulkImage의 Scroll을 처리하기 위한 Hook 
```

```ts
useImageProgress(image: CornerstoneImage | null | undefined): number | null

// CornerstoneImage의 Progress를 number | null로 반환해준다
// null은 Progress가 진행되지 않고 있다는 뜻이다
```

```ts
useInsightViewerSync(): {
    cornerstoneRenderData: CornerstoneRenderData | null,
    updateCornerstoneRenderData: (renderData: CornerstoneRenderData) => void,
}

// <InsightViewer updateCornerstoneRenderData={} /> 에서 Render Data를 받고
// <MachineHeatmapViewer cornerstoneRenderData={} />, <UserContourDrawer cornerstoneRenderData={} /> 쪽으로 넣어준다
// Sync 작업을 간소화 시키기 위한 Hook
```

```ts
useUserContour(): {
    contours: Contour[],
    focusedContour: Contour | null,
    addContour: (polygon: Point[], confidenceLevel: number) => Contour | null,
    focusContour: (contour: Contour | null) => void,
    updateContour: (contour: Contour, patch: Partial<Contour>) => void,
    removeContour: (contour: Contour) => void,
    removeAllContours: () => void,
}

// <UserContourDrawer contours={} onFocus={} onAdd={} onRemove={} /> 
// <UserContourViewer contours={} focusedContour={} />
// 이 Component들을 다루기 위해 필요하다
```

```ts
useViewportMirroring(...destinations: (InsightViewer | RefObject<InsightViewer>)[]): {
    updateMasterRenderData: (renderData: CornerstoneRenderData) => void,
}

// <InsightViewer updateCornerstoneRenderData={} /> 에서 Render Data를 받고
// <InsightViewer ref={} /> 로 수집된 다른 InsightViewer들에 Viewport를 미러링 시킨다
// 여러개의 <InsightViewer>들을 Viewport 미러링 시키기 위해 필요하다

// 단방향 one → many 구조이기 때문에 Sync 구조는 아니고, 단순 Mirror 구조이다 
```

### WADO Image Loader
```ts
installWADOImageLoader() 

// cornerstone-wado-image-loader 관련 설정을 설치한다

unloadWADOImage(imageId: string | string[] | null)

// new CornerstoneImage(imageId, { unload: unloadWADOImage }) 쪽에 연관된다
// cornerstone-wado-image-loader 관련 Cache를 해제해준다
```

# Sample Codes

[Storybook](https://lunit-io.github.io/opt-tool-frontend)

## Stories

<!-- import **/*.stories.{ts,tsx} --title-tag h3 -->

### \_\_stories\_\_/DCMViewer.stories.tsx


```tsx
import {
  CornerstoneImage,
  CornerstoneSingleImage,
  installWADOImageLoader,
  unloadWADOImage,
} from '@lunit/insight-viewer';
import { DCMImage } from '@lunit/insight-viewer/components/DCMImage';
import { storiesOf } from '@storybook/react';
import React from 'react';

installWADOImageLoader();

const image1: CornerstoneImage = new CornerstoneSingleImage(`wadouri:https://lunit-io.github.io/frontend-fixtures/dcm-files/series/CT000010.dcm`, {unload: unloadWADOImage});
const image2: CornerstoneImage = new CornerstoneSingleImage(`wadouri:https://lunit-io.github.io/frontend-fixtures/dcm-files/series/CT000011.dcm`, {unload: unloadWADOImage});
const image3: CornerstoneImage = new CornerstoneSingleImage(`wadouri:https://lunit-io.github.io/frontend-fixtures/dcm-files/series/CT000012.dcm`, {unload: unloadWADOImage});
const image4: CornerstoneImage = new CornerstoneSingleImage(`wadouri:https://lunit-io.github.io/frontend-fixtures/dcm-files/series/CT000013.dcm`, {unload: unloadWADOImage});

storiesOf('insight-viewer', module)
  .add('<DCMImage>', () => (
    <ul>
      {
        [image1, image2, image3, image4].map((image, i) => (
          <li key={'image' + i}>
            <DCMImage cornerstoneImage={image} width={120} height={150}/>
          </li>
        ))
      }
    </ul>
  ));
```


### \_\_stories\_\_/InsightViewer.stories.tsx


```tsx
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
  const resetTime: number = useMemo(() => Date.now(), []);
  
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
```


### \_\_stories\_\_/MachineHeatmapViewer.stories.tsx


```tsx
import {
  CornerstoneImage,
  CornerstoneSingleImage,
  InsightViewer,
  InsightViewerContainer,
  installWADOImageLoader,
  MachineHeatmapViewer,
  ProgressViewer,
  unloadWADOImage,
  useInsightViewerSync,
  UserContourDrawer,
  UserContourViewer,
  useUserContour,
} from '@lunit/insight-viewer';
import { storiesOf } from '@storybook/react';
import React, { useMemo, useState } from 'react';
import { useController, withTestController } from './decorators/withTestController';
import data from './posMap.sample.json';

const {engine_result: {engine_result: {pos_map: posMap}}} = data;

installWADOImageLoader();

function Sample() {
  const resetTime: number = useMemo(() => Date.now(), []);
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
  
  const {
    cornerstoneRenderData,
    updateCornerstoneRenderData,
  } = useInsightViewerSync();
  
  const {
    contours,
    focusedContour,
    addContour,
    removeContour,
    focusContour,
  } = useUserContour();
  
  return (
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
      {/*
      engineResult.posMap을 그리는 Layer
      현재 Heatmap Spec (number[][])에 맞춰서 개발되었기 때문에
      Spec이 다르다면 새로운 Viewer를 만들어야 한다
      */}
      <MachineHeatmapViewer width={width}
                            height={height}
                            posMap={posMap}
                            threshold={0.1}
                            cornerstoneRenderData={cornerstoneRenderData}/>
      {
        contours &&
        contours.length > 0 &&
        cornerstoneRenderData &&
        <UserContourViewer width={width}
                           height={height}
                           contours={contours}
                           focusedContour={focusedContour}
                           cornerstoneRenderData={cornerstoneRenderData}/>
      }
      {
        contours &&
        cornerstoneRenderData &&
        control === 'pen' &&
        <UserContourDrawer width={width}
                           height={height}
                           contours={contours}
                           draw={control === 'pen' && interactionElement}
                           onFocus={focusContour}
                           onAdd={contour => addContour(contour, 0)}
                           onRemove={removeContour}
                           cornerstoneRenderData={cornerstoneRenderData}/>
      }
      <ProgressViewer image={image}
                      width={width}
                      height={height}/>
    </InsightViewerContainer>
  );
}

storiesOf('insight-viewer', module)
  .addDecorator(withTestController({
    width: [600, 400, 1000],
    height: [700, 400, 1000],
    control: ['pan', ['none', 'pen', 'pan', 'adjust']],
    wheel: ['zoom', ['none', 'zoom']],
    flip: false,
    invert: false,
  }))
  .add('<MachineHeatmapViewer>', () => <Sample/>);
```


### \_\_stories\_\_/ProgressCollector.stories.tsx


```tsx
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
  const resetTime: number = useMemo(() => Date.now(), []);
  
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
```


### \_\_stories\_\_/SeriesImage.stories.tsx


```tsx
import {
  CornerstoneBulkImage,
  CornerstoneSeriesImage,
  InsightViewer,
  InsightViewerContainer,
  installWADOImageLoader,
  ProgressViewer,
  unloadWADOImage,
  useBulkImageScroll,
  useImageProgress,
  useInsightViewerSync,
  UserContourDrawer,
  UserContourViewer,
  useUserContour,
} from '@lunit/insight-viewer';
import { storiesOf } from '@storybook/react';
import React, { useMemo, useState } from 'react';
import { useController, withTestController } from './decorators/withTestController';
import series from './series.json';

installWADOImageLoader();

function Component() {
  const resetTime: number = useMemo(() => Date.now(), []);
  // CornerstoneSeriesImage는 여러장의 dcm 이미지를 받는다
  const image: CornerstoneBulkImage = useMemo(() => new CornerstoneSeriesImage(series.map(p => `wadouri:https://lunit-io.github.io/frontend-fixtures/dcm-files/series/${p}`), {unload: unloadWADOImage}), []);
  
  const {
    width,
    height,
    control,
    wheel,
    invert,
    flip,
  } = useController();
  
  const [interactionElement, setInteractionElement] = useState<HTMLElement | null>(null);
  
  const {
    cornerstoneRenderData,
    updateCornerstoneRenderData,
  } = useInsightViewerSync();
  
  const {
    contours,
    focusedContour,
    addContour,
    removeContour,
    focusContour,
  } = useUserContour();
  
  // CornerstoneBulkImage를 Wheel과 연결 시킨다
  useBulkImageScroll({
    image,
    element: interactionElement,
    enabled: wheel === 'scroll',
  });
  
  const imageProgress = useImageProgress(image);
  
  return (
    <div>
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
          contours.length > 0 &&
          cornerstoneRenderData &&
          <UserContourViewer width={width}
                             height={height}
                             contours={contours}
                             focusedContour={focusedContour}
                             cornerstoneRenderData={cornerstoneRenderData}/>
        }
        {
          contours &&
          cornerstoneRenderData &&
          control === 'pen' &&
          <UserContourDrawer width={width}
                             height={height}
                             contours={contours}
                             draw={control === 'pen' && interactionElement}
                             onFocus={focusContour}
                             onAdd={contour => addContour(contour, 0)}
                             onRemove={removeContour}
                             cornerstoneRenderData={cornerstoneRenderData}/>
        }
        <ProgressViewer image={image}
                        width={width}
                        height={height}/>
      </InsightViewerContainer>
      
      {
        typeof imageProgress === 'number' &&
        <button onClick={() => image.destroy()}>
          Destroy Image (= Cancel Loading)
        </button>
      }
    </div>
  );
}

storiesOf('insight-viewer', module)
  .addDecorator(withTestController({
    width: [600, 400, 1000],
    height: [700, 400, 1000],
    control: ['pan', ['none', 'pen', 'pan', 'adjust']],
    wheel: ['scroll', ['none', 'zoom', 'scroll']],
    flip: false,
    invert: false,
  }))
  //.addDecorator(withSeriesImageController(image))
  .add('Series Image', () => <Component/>);
```


### \_\_stories\_\_/UserCircleViewer.stories.tsx


```tsx
import {
  CornerstoneImage,
  CornerstoneSingleImage,
  InsightViewer,
  InsightViewerContainer,
  installWADOImageLoader,
  ProgressViewer,
  unloadWADOImage,
  useInsightViewerSync,
  UserCircleDrawer,
  UserCircleViewer,
  useUserContour,
} from '@lunit/insight-viewer';
import { storiesOf } from '@storybook/react';
import React, { useMemo, useState } from 'react';
import { useController, withTestController } from './decorators/withTestController';

installWADOImageLoader();

function Sample() {
  const resetTime: number = useMemo(() => Date.now(), []);
  const image: CornerstoneImage = useMemo(() => new CornerstoneSingleImage(`wadouri:https://lunit-io.github.io/frontend-fixtures/dcm-files/series/CT000010.dcm`, {unload: unloadWADOImage}), []);
  
  const {
    width,
    height,
    control,
    wheel,
    invert,
    flip,
  } = useController();
  
  // pan, adjust, zoom은
  // pan={true}로 설정하면 내부 Element를 사용해서 MouseEvent를 처리하게 되고,
  // pan={HTMLElement}로 설정하면 해당 Element를 사용해서 MouseEvent를 처리하게 된다.
  // MouseEvent를 처리하는 Layer가 여러개 중첩될 때, 하위 Layer의 MouseEvent가 막히는 현상을 해결해준다.
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
    addContour,
    removeContour,
    focusContour,
  } = useUserContour({
    mode: 'circle',
  });
  
  return (
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
        // 사용자가 그린 Annotation을 보여준다
        // contours가 있는 경우에만 출력
        contours &&
        contours.length > 0 &&
        cornerstoneRenderData &&
        <UserCircleViewer width={width}
                          height={height}
                          contours={contours}
                          focusedContour={focusedContour}
                          cornerstoneRenderData={cornerstoneRenderData}/>
      }
      {
        // Annotation을 그리고, 지우게 해준다
        // control === 'pen' 인 경우에만 출력
        contours &&
        cornerstoneRenderData &&
        control === 'pen' &&
        <UserCircleDrawer width={width}
                          height={height}
                          contours={contours}
                          draw={control === 'pen' && interactionElement}
                          onFocus={focusContour}
                          onAdd={contour => addContour(contour, 0)}
                          onRemove={removeContour}
                          cornerstoneRenderData={cornerstoneRenderData}/>
      }
      <ProgressViewer image={image}
                      width={width}
                      height={height}/>
    </InsightViewerContainer>
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
  .add('<UserCircleViewer>', () => <Sample/>);
```


### \_\_stories\_\_/UserContourViewer.stories.tsx


```tsx
import {
  CornerstoneImage,
  CornerstoneSingleImage,
  InsightViewer,
  InsightViewerContainer,
  installWADOImageLoader,
  ProgressViewer,
  unloadWADOImage,
  useInsightViewerSync,
  UserContourDrawer,
  UserContourViewer,
  useUserContour,
} from '@lunit/insight-viewer';
import { storiesOf } from '@storybook/react';
import React, { useMemo, useState } from 'react';
import { useController, withTestController } from './decorators/withTestController';

installWADOImageLoader();

function Sample() {
  const resetTime: number = useMemo(() => Date.now(), []);
  const image: CornerstoneImage = useMemo(() => new CornerstoneSingleImage(`wadouri:https://lunit-io.github.io/frontend-fixtures/dcm-files/series/CT000010.dcm`, {unload: unloadWADOImage}), []);
  
  const {
    width,
    height,
    control,
    wheel,
    invert,
    flip,
  } = useController();
  
  // pan, adjust, zoom은
  // pan={true}로 설정하면 내부 Element를 사용해서 MouseEvent를 처리하게 되고,
  // pan={HTMLElement}로 설정하면 해당 Element를 사용해서 MouseEvent를 처리하게 된다.
  // MouseEvent를 처리하는 Layer가 여러개 중첩될 때, 하위 Layer의 MouseEvent가 막히는 현상을 해결해준다.
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
    addContour,
    removeContour,
    focusContour,
  } = useUserContour();
  
  return (
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
        // 사용자가 그린 Annotation을 보여준다
        // contours가 있는 경우에만 출력
        contours &&
        contours.length > 0 &&
        cornerstoneRenderData &&
        <UserContourViewer width={width}
                           height={height}
                           contours={contours}
                           focusedContour={focusedContour}
                           cornerstoneRenderData={cornerstoneRenderData}/>
      }
      {
        // Annotation을 그리고, 지우게 해준다
        // control === 'pen' 인 경우에만 출력
        contours &&
        cornerstoneRenderData &&
        control === 'pen' &&
        <UserContourDrawer width={width}
                           height={height}
                           contours={contours}
                           draw={control === 'pen' && interactionElement}
                           onFocus={focusContour}
                           onAdd={contour => addContour(contour, 0)}
                           onRemove={removeContour}
                           cornerstoneRenderData={cornerstoneRenderData}/>
      }
      <ProgressViewer image={image}
                      width={width}
                      height={height}/>
    </InsightViewerContainer>
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
  .add('<UserContourViewer>', () => <Sample/>);
```


### \_\_stories\_\_/UserContourViewerCanvasStyle.stories.tsx


```tsx
import {
  CornerstoneImage,
  CornerstoneSingleImage,
  InsightViewer,
  InsightViewerContainer,
  installWADOImageLoader,
  ProgressViewer,
  unloadWADOImage,
  useInsightViewerSync,
  UserContourCanvasDrawer,
  UserContourCanvasViewer,
  useUserContour,
} from '@lunit/insight-viewer';
import { storiesOf } from '@storybook/react';
import React, { useMemo, useState } from 'react';
import { useController, withTestController } from './decorators/withTestController';

installWADOImageLoader();

function Sample() {
  const resetTime: number = useMemo(() => Date.now(), []);
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
  
  const {
    cornerstoneRenderData,
    updateCornerstoneRenderData,
  } = useInsightViewerSync();
  
  const {
    contours,
    focusedContour,
    addContour,
    removeContour,
    focusContour,
  } = useUserContour();
  
  return (
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
        contours.length > 0 &&
        cornerstoneRenderData &&
        // Canvas Style을 변경할 수 있다
        <UserContourCanvasViewer width={width}
                                 height={height}
                                 contours={contours}
                                 focusedContour={focusedContour}
                                 cornerstoneRenderData={cornerstoneRenderData}
        
                                 canvasStrokeLineWidth={10}
                                 canvasStrokeStyle="blue"
                                 canvasFillStyle="rgba(0, 0, 255, 0.3)"
                                 canvasFontStyle="normal normal 600 40px proximanova"
                                 canvasFocusedStrokeLineWidth={20}
                                 canvasFocusedStrokeStyle="red"
                                 canvasFocusedFillStyle="rgba(255, 0, 0, 0.3)"
                                 canvasFocusedFontStyle="normal normal 600 50px proximanova"/>
      }
      {
        contours &&
        cornerstoneRenderData &&
        control === 'pen' &&
        // Canvas Style을 변경할 수 있다
        <UserContourCanvasDrawer width={width}
                                 height={height}
                                 contours={contours}
                                 draw={control === 'pen' && interactionElement}
                                 onFocus={focusContour}
                                 onAdd={contour => addContour(contour, 0)}
                                 onRemove={removeContour}
                                 cornerstoneRenderData={cornerstoneRenderData}
        
                                 canvasStokeLineWidth={8}
                                 canvasStokeStyle="purple"
                                 canvasFillStyle="rgba(255, 255, 255, 0.4)"/>
      }
      <ProgressViewer image={image}
                      width={width}
                      height={height}/>
    </InsightViewerContainer>
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
  .add('<UserContourCanvasViewer canvasStokeStyle="{}">', () => <Sample/>);
```


### \_\_stories\_\_/UserContourViewerColors.stories.tsx


```tsx
import {
  Contour,
  CornerstoneImage,
  CornerstoneSingleImage,
  InsightViewer,
  InsightViewerContainer,
  installWADOImageLoader,
  ProgressViewer,
  unloadWADOImage,
  useInsightViewerSync,
  UserContourDrawer,
  UserContourViewer,
  useUserContour,
} from '@lunit/insight-viewer';
import { storiesOf } from '@storybook/react';
import React, { useMemo, useState } from 'react';
import styled, { css } from 'styled-components';
import { useController, withTestController } from './decorators/withTestController';

installWADOImageLoader();

function labelFunction(contour: Contour): string {
  return `CONTOUR(${contour.id})`;
}

const initialContours: Omit<Contour, 'id'>[] = [
  {
    polygon: [[365.2266666666667, 40.959999999999994], [360.96000000000004, 43.519999999999996], [356.6933333333333, 46.93333333333334], [353.28000000000003, 50.346666666666664], [349.8666666666667, 53.760000000000005], [348.16, 58.879999999999995], [346.4533333333334, 64.85333333333334], [345.6, 70.82666666666667], [345.6, 77.65333333333334], [349.0133333333334, 85.33333333333333], [358.40000000000003, 93.01333333333334], [371.20000000000005, 98.13333333333334], [390.8266666666667, 102.39999999999999], [412.16, 103.25333333333334], [432.64000000000004, 101.54666666666667], [444.5866666666667, 98.13333333333334], [453.12, 94.72000000000001], [458.24, 91.30666666666666], [460.8, 86.18666666666668], [461.65333333333336, 82.77333333333334], [457.3866666666667, 77.65333333333334], [452.2666666666667, 70.82666666666667], [446.29333333333335, 63.146666666666675], [443.73333333333335, 58.02666666666667], [441.17333333333335, 52.906666666666666], [439.4666666666667, 49.49333333333334], [437.76000000000005, 47.78666666666666]],
    confidenceLevel: 0,
    label: labelFunction,
  },
  {
    polygon: [[260.2666666666667, 180.9066666666667], [260.2666666666667, 181.76], [256, 186.0266666666667], [253.44000000000003, 188.5866666666667], [250.88000000000002, 192], [248.32000000000002, 197.97333333333336], [245.76000000000002, 204.8], [244.9066666666667, 212.48000000000002], [244.9066666666667, 224.42666666666668], [248.32000000000002, 235.51999999999998], [257.7066666666667, 246.61333333333334], [271.36, 256.85333333333335], [298.6666666666667, 265.38666666666666], [308.9066666666667, 266.24], [331.9466666666667, 264.53333333333336], [343.04, 258.56], [349.8666666666667, 253.44], [354.1333333333334, 248.32], [356.6933333333333, 242.3466666666667], [357.5466666666667, 236.37333333333333], [357.5466666666667, 228.69333333333333], [357.5466666666667, 220.16000000000003], [354.9866666666667, 211.62666666666667], [349.8666666666667, 201.38666666666666], [343.8933333333334, 193.70666666666665], [337.06666666666666, 189.44], [328.53333333333336, 186.0266666666667], [320.85333333333335, 186.0266666666667], [313.17333333333335, 186.88]],
    confidenceLevel: 0,
    label: labelFunction,
  },
  {
    polygon: [[157.01333333333335, 369.49333333333334], [157.01333333333335, 369.49333333333334], [151.89333333333335, 376.32], [148.48000000000002, 382.29333333333335], [144.21333333333334, 389.97333333333336], [138.24, 405.33333333333337], [134.82666666666668, 416.4266666666667], [133.12, 431.7866666666667], [132.26666666666668, 444.5866666666667], [133.12, 454.82666666666665], [136.53333333333333, 462.50666666666666], [145.06666666666666, 470.18666666666667], [155.30666666666667, 474.4533333333333], [169.81333333333333, 477.0133333333334], [184.32000000000002, 476.16], [195.41333333333336, 472.7466666666667], [205.65333333333334, 467.62666666666667], [211.6266666666667, 463.36], [219.30666666666667, 456.53333333333336], [221.86666666666667, 451.41333333333336], [222.72000000000003, 446.29333333333335], [222.72000000000003, 439.4666666666667], [221.01333333333335, 430.08], [216.74666666666667, 418.9866666666667], [212.48000000000002, 409.6], [207.36, 401.06666666666666], [200.53333333333336, 394.24], [193.70666666666668, 389.12], [187.73333333333335, 385.70666666666665]],
    confidenceLevel: 0,
    label: labelFunction,
  },
  {
    polygon: [[104.96000000000001, 89.60000000000001], [104.10666666666667, 89.60000000000001], [97.28, 91.30666666666666], [91.30666666666667, 93.01333333333334], [86.18666666666667, 94.72000000000001], [79.36, 98.13333333333334], [71.68, 103.25333333333334], [65.70666666666668, 109.22666666666667], [61.440000000000005, 113.49333333333333], [58.88, 121.17333333333333], [58.02666666666667, 129.70666666666665], [60.58666666666667, 145.06666666666666], [64, 151.04000000000002], [73.38666666666667, 162.98666666666668], [96.42666666666668, 179.2], [115.2, 186.88], [134.82666666666668, 191.1466666666667], [155.30666666666667, 191.1466666666667], [168.10666666666668, 188.5866666666667], [178.34666666666666, 186.0266666666667], [186.88000000000002, 180.9066666666667], [191.14666666666668, 175.7866666666667], [193.70666666666668, 169.81333333333333], [194.56, 163.84000000000003], [194.56, 158.72000000000003], [194.56, 151.89333333333332], [193.70666666666668, 146.77333333333337], [192, 140.8], [192, 139.09333333333336], [190.29333333333335, 133.97333333333336]],
    confidenceLevel: 0,
    label: labelFunction,
  },
  {
    polygon: [[249.17333333333335, -17.06666666666667], [246.61333333333334, -17.06666666666667], [232.10666666666668, -12.800000000000004], [221.01333333333335, -9.38666666666667], [208.21333333333334, -5.1200000000000045], [198.82666666666668, 0], [192, 5.119999999999997], [187.73333333333335, 10.240000000000002], [185.17333333333335, 15.36], [183.46666666666667, 23.040000000000006], [183.46666666666667, 34.13333333333334], [183.46666666666667, 46.93333333333334], [186.02666666666667, 64.85333333333334], [190.29333333333335, 76.8], [197.97333333333336, 86.18666666666668], [207.36, 93.01333333333334], [221.86666666666667, 97.28000000000002], [238.08, 98.98666666666666], [256.85333333333335, 98.13333333333334], [271.36, 93.86666666666666], [284.16, 87.89333333333333], [296.96000000000004, 80.21333333333334], [306.3466666666667, 72.53333333333333], [310.61333333333334, 67.41333333333334], [313.17333333333335, 60.58666666666667], [314.0266666666667, 54.61333333333333], [314.0266666666667, 44.373333333333335], [312.32, 35.84], [308.9066666666667, 25.599999999999994], [306.3466666666667, 17.066666666666663], [304.64000000000004, 7.68], [303.7866666666667, 1.7066666666666634], [302.93333333333334, -2.5600000000000023], [302.08000000000004, -5.973333333333336]],
    confidenceLevel: 0,
    label: labelFunction,
  },
  {
    polygon: [[320, 363.52], [318.29333333333335, 363.52], [314.0266666666667, 365.2266666666667], [308.05333333333334, 367.7866666666667], [300.37333333333333, 374.61333333333334], [291.84000000000003, 381.44], [287.5733333333333, 389.12], [285.0133333333334, 395.94666666666666], [284.16, 401.92], [284.16, 407.04], [287.5733333333333, 414.72], [295.25333333333333, 423.25333333333333], [305.49333333333334, 432.64], [318.29333333333335, 441.17333333333335], [329.3866666666667, 446.29333333333335], [344.74666666666667, 449.7066666666667], [353.28000000000003, 450.56], [360.96000000000004, 450.56], [366.93333333333334, 448], [374.61333333333334, 444.5866666666667], [380.5866666666667, 441.17333333333335], [384.85333333333335, 437.76], [389.12, 433.49333333333334], [391.68, 426.6666666666667], [392.53333333333336, 416.4266666666667], [393.3866666666667, 401.92], [393.3866666666667, 391.68], [390.8266666666667, 382.29333333333335], [388.2666666666667, 377.17333333333335], [384.85333333333335, 372.9066666666667], [379.73333333333335, 371.2], [374.61333333333334, 370.3466666666667], [367.7866666666667, 370.3466666666667], [358.40000000000003, 370.3466666666667], [354.9866666666667, 370.3466666666667]],
    confidenceLevel: 0,
    label: labelFunction,
  },
  {
    polygon: [[410.4533333333334, 273.06666666666666], [407.04, 273.92], [401.92, 275.62666666666667], [397.65333333333336, 276.48], [395.09333333333336, 278.18666666666667], [392.53333333333336, 279.04], [389.97333333333336, 281.6], [388.2666666666667, 284.16], [386.56, 289.28000000000003], [384.85333333333335, 296.1066666666667], [383.1466666666667, 306.3466666666667], [381.44, 318.29333333333335], [380.5866666666667, 327.68], [381.44, 333.65333333333336], [385.7066666666667, 337.92], [392.53333333333336, 342.18666666666667], [401.92, 345.6], [414.72, 349.0133333333333], [427.52000000000004, 349.8666666666667], [438.61333333333334, 349.8666666666667], [446.29333333333335, 347.3066666666667], [453.12, 344.74666666666667], [456.53333333333336, 341.3333333333333], [459.9466666666667, 337.06666666666666], [461.65333333333336, 332.8], [463.36, 327.68], [464.21333333333337, 321.70666666666665], [465.0666666666667, 314.88], [465.92, 307.2], [465.92, 302.08], [465.92, 296.96], [465.92, 292.6933333333333], [465.0666666666667, 289.28000000000003], [463.36, 285.0133333333333], [461.65333333333336, 281.6], [458.24, 277.3333333333333], [454.8266666666667, 274.7733333333333], [450.56, 271.36], [447.1466666666667, 269.6533333333333], [444.5866666666667, 267.94666666666666], [442.88000000000005, 267.09333333333336], [440.32000000000005, 267.09333333333336]],
    confidenceLevel: 0,
    label: labelFunction,
  },
  {
    polygon: [[95.57333333333334, 251.73333333333335], [89.60000000000001, 255.14666666666665], [82.77333333333334, 261.12], [75.94666666666667, 267.94666666666666], [72.53333333333333, 273.92], [69.97333333333334, 279.8933333333333], [69.12, 285.0133333333333], [69.12, 290.9866666666667], [69.97333333333334, 298.6666666666667], [75.94666666666667, 308.05333333333334], [82.77333333333334, 315.73333333333335], [93.01333333333334, 323.41333333333336], [106.66666666666667, 330.24], [120.32000000000001, 332.8], [134.82666666666668, 333.65333333333336], [157.86666666666667, 330.24], [174.08, 323.41333333333336], [183.46666666666667, 317.44], [193.70666666666668, 310.61333333333334], [201.38666666666668, 303.7866666666667], [205.65333333333334, 297.81333333333333], [207.36, 291.84], [208.21333333333334, 283.3066666666667], [205.65333333333334, 273.92], [197.97333333333336, 262.82666666666665], [188.58666666666667, 251.73333333333335], [180.05333333333334, 244.90666666666664], [169.81333333333333, 238.07999999999998], [161.28, 233.81333333333333], [154.45333333333335, 231.25333333333333], [149.33333333333334, 230.39999999999998], [145.06666666666666, 230.39999999999998]],
    confidenceLevel: 0,
    label: labelFunction,
  },
  {
    polygon: [[31.573333333333334, 365.2266666666667], [30.720000000000002, 365.2266666666667], [27.30666666666667, 368.64], [24.74666666666667, 372.9066666666667], [19.62666666666667, 380.5866666666667], [15.360000000000001, 387.41333333333336], [11.946666666666667, 395.09333333333336], [10.24, 403.62666666666667], [9.386666666666667, 410.4533333333333], [9.386666666666667, 417.28000000000003], [11.093333333333334, 422.40000000000003], [17.92, 427.52000000000004], [30.720000000000002, 433.49333333333334], [45.22666666666667, 435.2], [55.46666666666667, 435.2], [65.70666666666668, 434.3466666666667], [74.24000000000001, 430.08], [81.92, 424.96000000000004], [87.04, 419.84000000000003], [90.45333333333333, 414.72], [92.16000000000001, 409.6], [93.01333333333334, 403.62666666666667], [93.01333333333334, 395.94666666666666], [90.45333333333333, 388.26666666666665], [86.18666666666667, 381.44], [81.92, 375.4666666666667], [75.09333333333333, 370.3466666666667], [63.14666666666667, 364.37333333333333], [53.760000000000005, 362.6666666666667], [48.64, 362.6666666666667], [42.66666666666667, 363.52], [40.96, 364.37333333333333], [36.693333333333335, 366.08]],
    confidenceLevel: 0,
    label: labelFunction,
  },
];

const contourStyle = (id: number, color: string) => css`
  > polygon[data-id="${id}"] {
    stroke: ${color};
    fill: ${color};
    fill-opacity: 0.3;
  }
  
  > text[data-id="${id}"] {
    fill: ${color};
    opacity: 0.8;
    
    &[data-focused] {
      opacity: 1;
    }
  }
`;

const colors = [
  '#3366cc',
  '#dc3912',
  '#ff9900',
  '#109618',
  '#990099',
  '#0099c6',
  '#dd4477',
  '#66aa00',
  '#b82e2e',
  '#316395',
  '#994499',
  '#22aa99',
  '#aaaa11',
  '#6633cc',
  '#e67300',
  '#8b0707',
  '#651067',
  '#329262',
  '#5574a6',
  '#3b3eac',
];

const Viewer = styled(UserContourViewer)`
  ${colors.map((color, i) => contourStyle(i, color))}
`;

const Drawer = styled(UserContourDrawer)`
  > polyline {
    stroke: purple;
    stroke-width: 5px;
    fill: rgba(255, 255, 255, 0.4);
  }
`;

function Sample() {
  const resetTime: number = useMemo(() => Date.now(), []);
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
  
  const {
    cornerstoneRenderData,
    updateCornerstoneRenderData,
  } = useInsightViewerSync();
  
  const {
    contours,
    focusedContour,
    addContour,
    removeContour,
    focusContour,
  } = useUserContour({initialContours});
  
  return (
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
        contours.length > 0 &&
        cornerstoneRenderData &&
        // Canvas Style을 변경할 수 있다
        <Viewer width={width}
                height={height}
                contours={contours}
                focusedContour={focusedContour}
                cornerstoneRenderData={cornerstoneRenderData}/>
      }
      {
        contours &&
        cornerstoneRenderData &&
        control === 'pen' &&
        // Canvas Style을 변경할 수 있다
        <Drawer width={width}
                height={height}
                contours={contours}
                draw={control === 'pen' && interactionElement}
                onFocus={focusContour}
                onAdd={contour => addContour(contour, 0, labelFunction)}
                onRemove={removeContour}
                cornerstoneRenderData={cornerstoneRenderData}/>
      }
      <ProgressViewer image={image}
                      width={width}
                      height={height}/>
    </InsightViewerContainer>
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
  .add('<UserContourViewer className={colors}>', () => <Sample/>);
```


### \_\_stories\_\_/UserContourViewerColors2.stories.tsx


```tsx
import {
  Contour,
  CornerstoneImage,
  CornerstoneSingleImage,
  InsightViewer,
  InsightViewerContainer,
  installWADOImageLoader,
  ProgressViewer,
  unloadWADOImage,
  useInsightViewerSync,
  UserContourDrawer,
  UserContourViewer,
  useUserContour,
} from '@lunit/insight-viewer';
import { storiesOf } from '@storybook/react';
import React, { useMemo, useState } from 'react';
import styled, { css } from 'styled-components';
import { useController, withTestController } from './decorators/withTestController';

installWADOImageLoader();

function labelFunction(contour: Contour): string {
  return `[${contour.id}] ${contour.dataAttrs!['data-category']}`;
}

const initialContours: Omit<Contour, 'id'>[] = [
  {
    polygon: [[365.2266666666667, 40.959999999999994], [360.96000000000004, 43.519999999999996], [356.6933333333333, 46.93333333333334], [353.28000000000003, 50.346666666666664], [349.8666666666667, 53.760000000000005], [348.16, 58.879999999999995], [346.4533333333334, 64.85333333333334], [345.6, 70.82666666666667], [345.6, 77.65333333333334], [349.0133333333334, 85.33333333333333], [358.40000000000003, 93.01333333333334], [371.20000000000005, 98.13333333333334], [390.8266666666667, 102.39999999999999], [412.16, 103.25333333333334], [432.64000000000004, 101.54666666666667], [444.5866666666667, 98.13333333333334], [453.12, 94.72000000000001], [458.24, 91.30666666666666], [460.8, 86.18666666666668], [461.65333333333336, 82.77333333333334], [457.3866666666667, 77.65333333333334], [452.2666666666667, 70.82666666666667], [446.29333333333335, 63.146666666666675], [443.73333333333335, 58.02666666666667], [441.17333333333335, 52.906666666666666], [439.4666666666667, 49.49333333333334], [437.76000000000005, 47.78666666666666]],
    confidenceLevel: 0,
    label: labelFunction,
    dataAttrs: {
      'data-category': 'normal',
    },
  },
  {
    polygon: [[260.2666666666667, 180.9066666666667], [260.2666666666667, 181.76], [256, 186.0266666666667], [253.44000000000003, 188.5866666666667], [250.88000000000002, 192], [248.32000000000002, 197.97333333333336], [245.76000000000002, 204.8], [244.9066666666667, 212.48000000000002], [244.9066666666667, 224.42666666666668], [248.32000000000002, 235.51999999999998], [257.7066666666667, 246.61333333333334], [271.36, 256.85333333333335], [298.6666666666667, 265.38666666666666], [308.9066666666667, 266.24], [331.9466666666667, 264.53333333333336], [343.04, 258.56], [349.8666666666667, 253.44], [354.1333333333334, 248.32], [356.6933333333333, 242.3466666666667], [357.5466666666667, 236.37333333333333], [357.5466666666667, 228.69333333333333], [357.5466666666667, 220.16000000000003], [354.9866666666667, 211.62666666666667], [349.8666666666667, 201.38666666666666], [343.8933333333334, 193.70666666666665], [337.06666666666666, 189.44], [328.53333333333336, 186.0266666666667], [320.85333333333335, 186.0266666666667], [313.17333333333335, 186.88]],
    confidenceLevel: 0,
    label: labelFunction,
    dataAttrs: {
      'data-category': 'abnormal',
    },
  },
  {
    polygon: [[157.01333333333335, 369.49333333333334], [157.01333333333335, 369.49333333333334], [151.89333333333335, 376.32], [148.48000000000002, 382.29333333333335], [144.21333333333334, 389.97333333333336], [138.24, 405.33333333333337], [134.82666666666668, 416.4266666666667], [133.12, 431.7866666666667], [132.26666666666668, 444.5866666666667], [133.12, 454.82666666666665], [136.53333333333333, 462.50666666666666], [145.06666666666666, 470.18666666666667], [155.30666666666667, 474.4533333333333], [169.81333333333333, 477.0133333333334], [184.32000000000002, 476.16], [195.41333333333336, 472.7466666666667], [205.65333333333334, 467.62666666666667], [211.6266666666667, 463.36], [219.30666666666667, 456.53333333333336], [221.86666666666667, 451.41333333333336], [222.72000000000003, 446.29333333333335], [222.72000000000003, 439.4666666666667], [221.01333333333335, 430.08], [216.74666666666667, 418.9866666666667], [212.48000000000002, 409.6], [207.36, 401.06666666666666], [200.53333333333336, 394.24], [193.70666666666668, 389.12], [187.73333333333335, 385.70666666666665]],
    confidenceLevel: 0,
    label: labelFunction,
    dataAttrs: {
      'data-category': 'normal',
    },
  },
  {
    polygon: [[104.96000000000001, 89.60000000000001], [104.10666666666667, 89.60000000000001], [97.28, 91.30666666666666], [91.30666666666667, 93.01333333333334], [86.18666666666667, 94.72000000000001], [79.36, 98.13333333333334], [71.68, 103.25333333333334], [65.70666666666668, 109.22666666666667], [61.440000000000005, 113.49333333333333], [58.88, 121.17333333333333], [58.02666666666667, 129.70666666666665], [60.58666666666667, 145.06666666666666], [64, 151.04000000000002], [73.38666666666667, 162.98666666666668], [96.42666666666668, 179.2], [115.2, 186.88], [134.82666666666668, 191.1466666666667], [155.30666666666667, 191.1466666666667], [168.10666666666668, 188.5866666666667], [178.34666666666666, 186.0266666666667], [186.88000000000002, 180.9066666666667], [191.14666666666668, 175.7866666666667], [193.70666666666668, 169.81333333333333], [194.56, 163.84000000000003], [194.56, 158.72000000000003], [194.56, 151.89333333333332], [193.70666666666668, 146.77333333333337], [192, 140.8], [192, 139.09333333333336], [190.29333333333335, 133.97333333333336]],
    confidenceLevel: 0,
    label: labelFunction,
    dataAttrs: {
      'data-category': 'normal',
    },
  },
  {
    polygon: [[249.17333333333335, -17.06666666666667], [246.61333333333334, -17.06666666666667], [232.10666666666668, -12.800000000000004], [221.01333333333335, -9.38666666666667], [208.21333333333334, -5.1200000000000045], [198.82666666666668, 0], [192, 5.119999999999997], [187.73333333333335, 10.240000000000002], [185.17333333333335, 15.36], [183.46666666666667, 23.040000000000006], [183.46666666666667, 34.13333333333334], [183.46666666666667, 46.93333333333334], [186.02666666666667, 64.85333333333334], [190.29333333333335, 76.8], [197.97333333333336, 86.18666666666668], [207.36, 93.01333333333334], [221.86666666666667, 97.28000000000002], [238.08, 98.98666666666666], [256.85333333333335, 98.13333333333334], [271.36, 93.86666666666666], [284.16, 87.89333333333333], [296.96000000000004, 80.21333333333334], [306.3466666666667, 72.53333333333333], [310.61333333333334, 67.41333333333334], [313.17333333333335, 60.58666666666667], [314.0266666666667, 54.61333333333333], [314.0266666666667, 44.373333333333335], [312.32, 35.84], [308.9066666666667, 25.599999999999994], [306.3466666666667, 17.066666666666663], [304.64000000000004, 7.68], [303.7866666666667, 1.7066666666666634], [302.93333333333334, -2.5600000000000023], [302.08000000000004, -5.973333333333336]],
    confidenceLevel: 0,
    label: labelFunction,
    dataAttrs: {
      'data-category': 'abnormal',
    },
  },
  {
    polygon: [[320, 363.52], [318.29333333333335, 363.52], [314.0266666666667, 365.2266666666667], [308.05333333333334, 367.7866666666667], [300.37333333333333, 374.61333333333334], [291.84000000000003, 381.44], [287.5733333333333, 389.12], [285.0133333333334, 395.94666666666666], [284.16, 401.92], [284.16, 407.04], [287.5733333333333, 414.72], [295.25333333333333, 423.25333333333333], [305.49333333333334, 432.64], [318.29333333333335, 441.17333333333335], [329.3866666666667, 446.29333333333335], [344.74666666666667, 449.7066666666667], [353.28000000000003, 450.56], [360.96000000000004, 450.56], [366.93333333333334, 448], [374.61333333333334, 444.5866666666667], [380.5866666666667, 441.17333333333335], [384.85333333333335, 437.76], [389.12, 433.49333333333334], [391.68, 426.6666666666667], [392.53333333333336, 416.4266666666667], [393.3866666666667, 401.92], [393.3866666666667, 391.68], [390.8266666666667, 382.29333333333335], [388.2666666666667, 377.17333333333335], [384.85333333333335, 372.9066666666667], [379.73333333333335, 371.2], [374.61333333333334, 370.3466666666667], [367.7866666666667, 370.3466666666667], [358.40000000000003, 370.3466666666667], [354.9866666666667, 370.3466666666667]],
    confidenceLevel: 0,
    label: labelFunction,
    dataAttrs: {
      'data-category': 'normal',
    },
  },
  {
    polygon: [[410.4533333333334, 273.06666666666666], [407.04, 273.92], [401.92, 275.62666666666667], [397.65333333333336, 276.48], [395.09333333333336, 278.18666666666667], [392.53333333333336, 279.04], [389.97333333333336, 281.6], [388.2666666666667, 284.16], [386.56, 289.28000000000003], [384.85333333333335, 296.1066666666667], [383.1466666666667, 306.3466666666667], [381.44, 318.29333333333335], [380.5866666666667, 327.68], [381.44, 333.65333333333336], [385.7066666666667, 337.92], [392.53333333333336, 342.18666666666667], [401.92, 345.6], [414.72, 349.0133333333333], [427.52000000000004, 349.8666666666667], [438.61333333333334, 349.8666666666667], [446.29333333333335, 347.3066666666667], [453.12, 344.74666666666667], [456.53333333333336, 341.3333333333333], [459.9466666666667, 337.06666666666666], [461.65333333333336, 332.8], [463.36, 327.68], [464.21333333333337, 321.70666666666665], [465.0666666666667, 314.88], [465.92, 307.2], [465.92, 302.08], [465.92, 296.96], [465.92, 292.6933333333333], [465.0666666666667, 289.28000000000003], [463.36, 285.0133333333333], [461.65333333333336, 281.6], [458.24, 277.3333333333333], [454.8266666666667, 274.7733333333333], [450.56, 271.36], [447.1466666666667, 269.6533333333333], [444.5866666666667, 267.94666666666666], [442.88000000000005, 267.09333333333336], [440.32000000000005, 267.09333333333336]],
    confidenceLevel: 0,
    label: labelFunction,
    dataAttrs: {
      'data-category': 'abnormal',
    },
  },
  {
    polygon: [[95.57333333333334, 251.73333333333335], [89.60000000000001, 255.14666666666665], [82.77333333333334, 261.12], [75.94666666666667, 267.94666666666666], [72.53333333333333, 273.92], [69.97333333333334, 279.8933333333333], [69.12, 285.0133333333333], [69.12, 290.9866666666667], [69.97333333333334, 298.6666666666667], [75.94666666666667, 308.05333333333334], [82.77333333333334, 315.73333333333335], [93.01333333333334, 323.41333333333336], [106.66666666666667, 330.24], [120.32000000000001, 332.8], [134.82666666666668, 333.65333333333336], [157.86666666666667, 330.24], [174.08, 323.41333333333336], [183.46666666666667, 317.44], [193.70666666666668, 310.61333333333334], [201.38666666666668, 303.7866666666667], [205.65333333333334, 297.81333333333333], [207.36, 291.84], [208.21333333333334, 283.3066666666667], [205.65333333333334, 273.92], [197.97333333333336, 262.82666666666665], [188.58666666666667, 251.73333333333335], [180.05333333333334, 244.90666666666664], [169.81333333333333, 238.07999999999998], [161.28, 233.81333333333333], [154.45333333333335, 231.25333333333333], [149.33333333333334, 230.39999999999998], [145.06666666666666, 230.39999999999998]],
    confidenceLevel: 0,
    label: labelFunction,
    dataAttrs: {
      'data-category': 'normal',
    },
  },
  {
    polygon: [[31.573333333333334, 365.2266666666667], [30.720000000000002, 365.2266666666667], [27.30666666666667, 368.64], [24.74666666666667, 372.9066666666667], [19.62666666666667, 380.5866666666667], [15.360000000000001, 387.41333333333336], [11.946666666666667, 395.09333333333336], [10.24, 403.62666666666667], [9.386666666666667, 410.4533333333333], [9.386666666666667, 417.28000000000003], [11.093333333333334, 422.40000000000003], [17.92, 427.52000000000004], [30.720000000000002, 433.49333333333334], [45.22666666666667, 435.2], [55.46666666666667, 435.2], [65.70666666666668, 434.3466666666667], [74.24000000000001, 430.08], [81.92, 424.96000000000004], [87.04, 419.84000000000003], [90.45333333333333, 414.72], [92.16000000000001, 409.6], [93.01333333333334, 403.62666666666667], [93.01333333333334, 395.94666666666666], [90.45333333333333, 388.26666666666665], [86.18666666666667, 381.44], [81.92, 375.4666666666667], [75.09333333333333, 370.3466666666667], [63.14666666666667, 364.37333333333333], [53.760000000000005, 362.6666666666667], [48.64, 362.6666666666667], [42.66666666666667, 363.52], [40.96, 364.37333333333333], [36.693333333333335, 366.08]],
    confidenceLevel: 0,
    label: labelFunction,
    dataAttrs: {
      'data-category': 'abnormal',
    },
  },
];

const contourStyle = (value: string, color: string) => css`
  > polygon[data-category="${value}"] {
    stroke: ${color};
    fill: ${color};
    fill-opacity: 0.3;
  }
  
  > text[data-category="${value}"] {
    fill: ${color};
    opacity: 0.8;
    
    &[data-focused] {
      opacity: 1;
    }
  }
`;

const colors = {
  normal: '#3366cc',
  abnormal: '#dc3912',
};

const Viewer = styled(UserContourViewer)`
  ${Object.keys(colors).map(value => contourStyle(value, colors[value]))};
`;

const Drawer = styled(UserContourDrawer)`
  > polyline {
    stroke: purple;
    stroke-width: 5px;
    fill: rgba(255, 255, 255, 0.4);
  }
`;

function Sample() {
  const resetTime: number = useMemo(() => Date.now(), []);
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
  
  const {
    cornerstoneRenderData,
    updateCornerstoneRenderData,
  } = useInsightViewerSync();
  
  const {
    contours,
    focusedContour,
    addContour,
    removeContour,
    focusContour,
  } = useUserContour({initialContours});
  
  return (
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
        contours.length > 0 &&
        cornerstoneRenderData &&
        // Canvas Style을 변경할 수 있다
        <Viewer width={width}
                height={height}
                contours={contours}
                focusedContour={focusedContour}
                cornerstoneRenderData={cornerstoneRenderData}/>
      }
      {
        contours &&
        cornerstoneRenderData &&
        control === 'pen' &&
        // Canvas Style을 변경할 수 있다
        <Drawer width={width}
                height={height}
                contours={contours}
                draw={control === 'pen' && interactionElement}
                onFocus={focusContour}
                onAdd={contour => addContour(contour, 0, labelFunction)}
                onRemove={removeContour}
                cornerstoneRenderData={cornerstoneRenderData}/>
      }
      <ProgressViewer image={image}
                      width={width}
                      height={height}/>
    </InsightViewerContainer>
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
  .add('<UserContourViewer className={categoryColors}>', () => <Sample/>);
```


### \_\_stories\_\_/UserContourViewerStyle.stories.tsx


```tsx
import {
  CornerstoneImage,
  CornerstoneSingleImage,
  InsightViewer,
  InsightViewerContainer,
  installWADOImageLoader,
  ProgressViewer,
  unloadWADOImage,
  useInsightViewerSync,
  UserContourDrawer,
  UserContourViewer,
  useUserContour,
} from '@lunit/insight-viewer';
import { storiesOf } from '@storybook/react';
import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { useController, withTestController } from './decorators/withTestController';

installWADOImageLoader();

const Viewer = styled(UserContourViewer)`
  > polygon {
    stroke-width: 10px;
    stroke: blue;
    fill: rgba(0, 0, 255, 0.3);
    
    &[data-focused] {
      stroke-width: 20px;
      stroke: red;
      fill: rgba(255, 0, 0, 0.3);
    }
  }
  
  > text {
    fill: blue;
   
    &[data-focused] {
      fill: red;
    }
  }

`;

const Drawer = styled(UserContourDrawer)`
  > polyline {
    stroke: purple;
    stroke-width: 8px;
    fill: rgba(255, 255, 255, 0.4);
  }
`;

function Sample() {
  const resetTime: number = useMemo(() => Date.now(), []);
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
  
  const {
    cornerstoneRenderData,
    updateCornerstoneRenderData,
  } = useInsightViewerSync();
  
  const {
    contours,
    focusedContour,
    addContour,
    removeContour,
    focusContour,
  } = useUserContour();
  
  return (
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
        contours.length > 0 &&
        cornerstoneRenderData &&
        // Canvas Style을 변경할 수 있다
        <Viewer width={width}
                height={height}
                contours={contours}
                focusedContour={focusedContour}
                cornerstoneRenderData={cornerstoneRenderData}/>
      }
      {
        contours &&
        cornerstoneRenderData &&
        control === 'pen' &&
        // Canvas Style을 변경할 수 있다
        <Drawer width={width}
                height={height}
                contours={contours}
                draw={control === 'pen' && interactionElement}
                onFocus={focusContour}
                onAdd={contour => addContour(contour, 0)}
                onRemove={removeContour}
                cornerstoneRenderData={cornerstoneRenderData}/>
      }
      <ProgressViewer image={image}
                      width={width}
                      height={height}/>
    </InsightViewerContainer>
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
  .add('<UserContourViewer className="">', () => <Sample/>);
```


### \_\_stories\_\_/useResizeObserver.stories.tsx


```tsx
import {
  CornerstoneImage,
  CornerstoneSingleImage,
  InsightViewer,
  InsightViewerContainer,
  installWADOImageLoader,
  unloadWADOImage,
  useInsightViewerSync,
} from '@lunit/insight-viewer';
import { storiesOf } from '@storybook/react';
import React, { useMemo } from 'react';
import useResizeObserver from 'use-resize-observer';

installWADOImageLoader();

function Sample() {
  const resetTime: number = useMemo(() => Date.now(), []);
  const image: CornerstoneImage = useMemo(() => new CornerstoneSingleImage(`wadouri:https://lunit-io.github.io/frontend-fixtures/dcm-files/series/CT000010.dcm`, {unload: unloadWADOImage}), []);
  
  const {
    updateCornerstoneRenderData,
  } = useInsightViewerSync();
  
  // 특정 Element의 width, height를 지속적으로 감지한다
  // flex 등 layout으로 처리된 <div> Element의 width, height를 useResizeObserver()로 받아서
  // <InsightViewer width={width} height={height}> 로 넘길 수 있다
  const [resizeRef, width, height] = useResizeObserver();
  
  return (
    <div ref={resizeRef} style={{width: '50vw', height: '80vh'}}>
      <InsightViewerContainer width={width} height={height}>
        <InsightViewer width={width}
                       height={height}
                       invert={false}
                       flip={false}
                       pan
                       adjust={false}
                       zoom={false}
                       resetTime={resetTime}
                       image={image}
                       updateCornerstoneRenderData={updateCornerstoneRenderData}/>
      </InsightViewerContainer>
    </div>
  );
}

storiesOf('insight-viewer', module)
  .add('useResizeObserver', () => <Sample/>);
```


### \_\_stories\_\_/UserPointViewer.stories.tsx


```tsx
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

function Sample() {
  const resetTime: number = useMemo(() => Date.now(), []);
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

```


### \_\_stories\_\_/useViewportMirroring.stories.tsx


```tsx
import {
  CornerstoneBulkImage,
  CornerstoneImage,
  CornerstoneSeriesImage,
  CornerstoneSingleImage,
  InsightViewer,
  InsightViewerContainer,
  installWADOImageLoader,
  unloadWADOImage,
  useBulkImageScroll,
  useInsightViewerSync,
  UserContourDrawer,
  UserContourViewer,
  useUserContour,
  useViewportMirroring,
} from '@lunit/insight-viewer';
import { storiesOf } from '@storybook/react';
import React, { RefObject, useMemo, useRef, useState } from 'react';
import { useController, withTestController } from './decorators/withTestController';
import series from './series.json';

installWADOImageLoader();

function Sample() {
  const resetTime: number = useMemo(() => Date.now(), []);
  const image1: CornerstoneImage = useMemo(() => new CornerstoneSingleImage(`wadouri:https://lunit-io.github.io/frontend-fixtures/dcm-files/series/CT000010.dcm`, {unload: unloadWADOImage}), []);
  const image2: CornerstoneImage = useMemo(() => new CornerstoneSingleImage(`wadouri:https://lunit-io.github.io/frontend-fixtures/dcm-files/series/CT000020.dcm`, {unload: unloadWADOImage}), []);
  const image3: CornerstoneImage = useMemo(() => new CornerstoneSingleImage(`wadouri:https://lunit-io.github.io/frontend-fixtures/dcm-files/series/CT000030.dcm`, {unload: unloadWADOImage}), []);
  const image4: CornerstoneBulkImage = useMemo(() => new CornerstoneSeriesImage(series.map(p => `wadouri:https://lunit-io.github.io/frontend-fixtures/dcm-files/series/${p}`), {unload: unloadWADOImage}), []);
  
  const {
    width,
    height,
    invert,
    flip,
  } = useController();
  
  // Viewport Mirroring의 대상에게 부여할 RefObject 들을 만든다
  const viewer2: RefObject<InsightViewer> = useRef(null);
  const viewer3: RefObject<InsightViewer> = useRef(null);
  const viewer4: RefObject<InsightViewer> = useRef(null);
  
  // updateMasterRenderData()가 실행되면 viewer2, viewer3, viewer4에 Viewport가 Mirroring 된다
  const {updateMasterRenderData} = useViewportMirroring(viewer2, viewer3, viewer4);
  
  // 3번째 화면을 위한 처리
  const [interactionElement3, setInteractionElement3] = useState<HTMLElement | null>(null);
  
  const {
    cornerstoneRenderData,
    updateCornerstoneRenderData,
  } = useInsightViewerSync();
  
  const {
    contours,
    focusedContour,
    addContour,
    removeContour,
    focusContour,
  } = useUserContour();
  
  // 4번째 화면을 위한 처리
  const [interactionElement4, setInteractionElement4] = useState<HTMLElement | null>(null);
  
  useBulkImageScroll({
    image: image4,
    element: interactionElement4,
    enabled: true,
  });
  
  return (
    <div style={{display: 'flex'}}>
      <InsightViewerContainer width={width} height={height}>
        <InsightViewer width={width}
                       height={height}
                       invert={invert}
                       flip={flip}
                       pan
                       adjust={false}
                       zoom
                       resetTime={resetTime}
                       image={image1}
                       updateCornerstoneRenderData={updateMasterRenderData}/>
      </InsightViewerContainer>
      
      <InsightViewerContainer width={width} height={height}>
        <InsightViewer ref={viewer2}
                       width={width}
                       height={height}
                       invert={invert}
                       flip={flip}
                       pan={false}
                       adjust
                       zoom={false}
                       resetTime={resetTime}
                       image={image2}
                       updateCornerstoneRenderData={renderData => console.log('#2', renderData)}/>
      </InsightViewerContainer>
      
      <InsightViewerContainer ref={setInteractionElement3} width={width} height={height}>
        <InsightViewer ref={viewer3}
                       width={width}
                       height={height}
                       invert={invert}
                       flip={flip}
                       pan={false}
                       adjust={false}
                       zoom={false}
                       resetTime={resetTime}
                       image={image3}
                       updateCornerstoneRenderData={updateCornerstoneRenderData}/>
        {
          contours &&
          contours.length > 0 &&
          cornerstoneRenderData &&
          <UserContourViewer width={width}
                             height={height}
                             contours={contours}
                             focusedContour={focusedContour}
                             cornerstoneRenderData={cornerstoneRenderData}/>
        }
        {
          contours &&
          cornerstoneRenderData &&
          <UserContourDrawer width={width}
                             height={height}
                             contours={contours}
                             draw={interactionElement3}
                             onFocus={focusContour}
                             onAdd={contour => addContour(contour, 0)}
                             onRemove={removeContour}
                             cornerstoneRenderData={cornerstoneRenderData}/>
        }
      </InsightViewerContainer>
      
      <InsightViewerContainer ref={setInteractionElement4} width={width} height={height}>
        <InsightViewer ref={viewer4}
                       width={width}
                       height={height}
                       invert={invert}
                       flip={flip}
                       pan={false}
                       adjust={false}
                       zoom={false}
                       resetTime={resetTime}
                       image={image4}
                       updateCornerstoneRenderData={renderData => console.log('#4', renderData)}/>
      </InsightViewerContainer>
    </div>
  );
}

storiesOf('insight-viewer', module)
  .addDecorator(withTestController({
    width: [300, 200, 500],
    height: [400, 300, 600],
    control: ['none', ['none']],
    wheel: ['none', ['none']],
    flip: false,
    invert: false,
  }))
  .add('useViewportMirroring()', () => <Sample/>);
```

<!-- importend -->

## Tests

<!-- import __tests__/*.{ts,tsx} --title-tag h3 -->
<!-- importend -->

# Changelog

## 2.6.0
### Added
- `<DCMImage>` 추가

## 2.5.0
### Added
- `<UserCircleViewer>` 추가

## 2.4.1
### Fixed
- Fix ESLint warnings
- `<UserPointViewer>` 의 기본 label 표시를 `contour.id` 사용

## 2.4.0
### Added
- `<UserPointViewer>` 추가

## 2.3.0
### Added
- `Contour.dataAttrs` 속성 추가 

## 2.2.0
### Fixed
- `CornerstoneImage.destroy()`시에 모든 dcm image loading을 취소시킴 

## 2.1.9
### Fixed
- `useViewportMirroring`에서 오작동이 일어날 수 있는 `<InsightViewer>.updateViewport()`를 분할

## 2.1.8
### Added
- `Contour.label` 추가 (입력된 경우 `Contour.id` 대신 출력됨)
- `const {addContours} = useUserContour()` 추가 (다량의 Contour 추가 가능)
- `useUserContour({initialContours})` 추가 (초기화)

## 2.1.7
### Fixed
- `UserContourDrawer`의 `componentWillUnmount()`에 의한 Event deactivation이 `mouseup` Event에 의해 취소되는 Event 순서 문제 해결
- `UserContourDrawer`에서 `null` 가능성 배제 코드 제거

## 2.1.4
### Fixed
- `CornerstoneSeriesImage`의 이미지 순서가 뒤섞이는 문제 해결

## 2.1.2
### Added
- `useUserContour({ nextId?: number | RefObject<number> })` 옵션 추가

## 2.1.1
### Added
- `<UserContourViewer className="">`, `<UserContourDrawer className="">` Custom Style 

## 2.1.0
### Added
- 기존 `<UserContourViewer>`와 `<UserContourDrawer>`는 `<UserContourCanvasViewer>`와 `<UserContourCanvasDrawer>`로 변경
- 신규 `<UserContourViewer>`와 `<UserContourDrawer>`는 SVG 기반으로 변경 (Viewport와 무관하게 일정한 Style을 유지함)

## 2.0.3
### Fixed
- `useViewportMirroring()`는 위치에 관련된 일부 속성만을 미러링 (`hflip`, `vflip`, `translation`, `scale`)