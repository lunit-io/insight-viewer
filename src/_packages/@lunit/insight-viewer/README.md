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
import React from 'react';
import { useController, withTestController } from './decorators/withTestController';

// cornerstoneWADOImageLoader 초기화
installWADOImageLoader();

// <InsightViewer resetTime={}>을 변경하면 Viewport 등 cornerstone-core 관련 속성들이 초기화 된다
const resetTime: number = Date.now();

// unload 옵션은 위에 선언된 installWADOImageLoader()와 함께 동작한다
// CornerstoneImage 객체를 unload 할때 wado image loader의 unload 동작을 하게 된다
const image: CornerstoneImage = new CornerstoneSingleImage(`wadouri:https://lunit-io.github.io/frontend-fixtures/dcm-files/series/CT000010.dcm`, {unload: unloadWADOImage});

function Sample() {
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
import React, { useState } from 'react';
import { useController, withTestController } from './decorators/withTestController';
import data from './posMap.sample.json';

const {engine_result: {engine_result: {pos_map: posMap}}} = data;

installWADOImageLoader();

const resetTime: number = Date.now();
const image: CornerstoneImage = new CornerstoneSingleImage(`wadouri:https://lunit-io.github.io/frontend-fixtures/dcm-files/series/CT000010.dcm`, {unload: unloadWADOImage});

function Sample() {
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
import React, { CSSProperties } from 'react';
import { useController, withTestController } from './decorators/withTestController';
import series from './series.json';

installWADOImageLoader();

const resetTime: number = Date.now();
const image1: CornerstoneImage = new CornerstoneSingleImage(`wadouri:https://lunit-io.github.io/frontend-fixtures/dcm-files/series/CT000010.dcm`, {unload: unloadWADOImage});
const image2: CornerstoneImage = new CornerstoneSingleImage(`wadouri:https://lunit-io.github.io/frontend-fixtures/dcm-files/series/CT000020.dcm`, {unload: unloadWADOImage});
const image3: CornerstoneImage = new CornerstoneSingleImage(`wadouri:https://lunit-io.github.io/frontend-fixtures/dcm-files/series/CT000030.dcm`, {unload: unloadWADOImage});
const image4: CornerstoneImage = new CornerstoneSeriesImage(series.map(p => `wadouri:https://lunit-io.github.io/frontend-fixtures/dcm-files/series/${p}`), {unload: unloadWADOImage});

function Sample() {
  // <ProgressCollector>는 하위의 <ProgressViewer>들의 상태를 수집한다
  return (
    <ProgressCollector>
      <Container/>
    </ProgressCollector>
  );
}

function Container() {
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
  useInsightViewerSync,
  UserContourDrawer,
  UserContourViewer,
  useUserContour,
} from '@lunit/insight-viewer';
import { storiesOf } from '@storybook/react';
import React, { useState } from 'react';
import { withSeriesImageController } from './decorators/withSeriesImageController';
import { useController, withTestController } from './decorators/withTestController';
import series from './series.json';

installWADOImageLoader();

const resetTime: number = Date.now();

// CornerstoneSeriesImage는 여러장의 dcm 이미지를 받는다
const image: CornerstoneBulkImage = new CornerstoneSeriesImage(series.map(p => `wadouri:https://lunit-io.github.io/frontend-fixtures/dcm-files/series/${p}`), {unload: unloadWADOImage});

function Component() {
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
    wheel: ['scroll', ['none', 'zoom', 'scroll']],
    flip: false,
    invert: false,
  }))
  .addDecorator(withSeriesImageController(image))
  .add('Series Image', () => <Component/>);
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
import React, { useState } from 'react';
import { useController, withTestController } from './decorators/withTestController';

installWADOImageLoader();

const resetTime: number = Date.now();
const image: CornerstoneImage = new CornerstoneSingleImage(`wadouri:https://lunit-io.github.io/frontend-fixtures/dcm-files/series/CT000010.dcm`, {unload: unloadWADOImage});

function Sample() {
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
    control: ['pan', ['none', 'pen', 'pan', 'adjust']],
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
import React, { useState } from 'react';
import { useController, withTestController } from './decorators/withTestController';

installWADOImageLoader();

const resetTime: number = Date.now();
const image: CornerstoneImage = new CornerstoneSingleImage(`wadouri:https://lunit-io.github.io/frontend-fixtures/dcm-files/series/CT000010.dcm`, {unload: unloadWADOImage});

function Sample() {
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
    control: ['pan', ['none', 'pen', 'pan', 'adjust']],
    wheel: ['zoom', ['none', 'zoom']],
    flip: false,
    invert: false,
  }))
  .add('<UserContourCanvasViewer canvasStokeStyle="{}">', () => <Sample/>);
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
import React, { useState } from 'react';
import styled from 'styled-components';
import { useController, withTestController } from './decorators/withTestController';

installWADOImageLoader();

const resetTime: number = Date.now();
const image: CornerstoneImage = new CornerstoneSingleImage(`wadouri:https://lunit-io.github.io/frontend-fixtures/dcm-files/series/CT000010.dcm`, {unload: unloadWADOImage});

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
    control: ['pan', ['none', 'pen', 'pan', 'adjust']],
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
import React from 'react';
import useResizeObserver from 'use-resize-observer';

installWADOImageLoader();

const resetTime: number = Date.now();
const image: CornerstoneImage = new CornerstoneSingleImage(`wadouri:https://lunit-io.github.io/frontend-fixtures/dcm-files/series/CT000010.dcm`, {unload: unloadWADOImage});

function Sample() {
  const {
    updateCornerstoneRenderData,
  } = useInsightViewerSync();
  
  // 특정 Element의 width, height를 지속적으로 감지한다
  // flex 등 layout으로 처리된 <div> Element의 width, height를 useResizeObserver()로 받아서
  // <InsightViewer width={width} height={height}> 로 넘길 수 있다
  const [resizeRef, width, height] = useResizeObserver();
  
  console.log('useResizeObserver.stories.tsx..Sample()', width, height);
  
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
import React, { RefObject, useRef, useState } from 'react';
import { useController, withTestController } from './decorators/withTestController';
import series from './series.json';

installWADOImageLoader();

const resetTime: number = Date.now();
const image1: CornerstoneImage = new CornerstoneSingleImage(`wadouri:https://lunit-io.github.io/frontend-fixtures/dcm-files/series/CT000010.dcm`, {unload: unloadWADOImage});
const image2: CornerstoneImage = new CornerstoneSingleImage(`wadouri:https://lunit-io.github.io/frontend-fixtures/dcm-files/series/CT000020.dcm`, {unload: unloadWADOImage});
const image3: CornerstoneImage = new CornerstoneSingleImage(`wadouri:https://lunit-io.github.io/frontend-fixtures/dcm-files/series/CT000030.dcm`, {unload: unloadWADOImage});
const image4: CornerstoneBulkImage = new CornerstoneSeriesImage(series.map(p => `wadouri:https://lunit-io.github.io/frontend-fixtures/dcm-files/series/${p}`), {unload: unloadWADOImage});

function Sample() {
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