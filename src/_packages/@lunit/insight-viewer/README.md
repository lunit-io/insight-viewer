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

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <script src="cornerstone.js"></script>
    <script src="cornerstoneWADOImageLoader.js/"></script>
    <script src="dicomParser.js"></script>
  </head>
</html>
``` 

`4.x` 버전 부터는 html 파일에 위와 같이 `<script>`를 통해서 js 파일들을 삽입해줘야 한다. 

# API

### Basic Types 

<!-- import types.ts -->

```ts
export type CornerstoneRenderData = Required<
  Pick<
    cornerstone.CornerstoneEventData,
    'canvasContext' | 'element' | 'enabledElement' | 'image' | 'renderTimeInMs' | 'viewport'
  >
>;

export type Point = [number, number];

// UserContoureViewer와 같은 곳에서 사용된다
export interface Contour {
  // 일종의 label 역할을 한다
  id: number;
  polygon: Point[];
  // 존재하는 경우 id 대신 출력된다
  label?: ((contour: this) => string) | string;
  dataAttrs?: { [attr: string]: string };
}

export interface ViewportTransformParams {
  element: HTMLElement;
  minScale: number;
  maxScale: number;
  currentViewport: cornerstone.Viewport | null;
}

export type ViewportTransform = (params: ViewportTransformParams) => Partial<cornerstone.Viewport> | undefined;

```

<!-- importend -->

<!-- import image/types.ts -->

```ts
import { Observable } from 'rxjs';

export interface CornerstoneImage {
  readonly image: Observable<cornerstone.Image | null>;
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
    detail &&
    typeof detail['url'] === 'string' &&
    typeof detail['imageId'] === 'string' &&
    typeof detail['loaded'] === 'number' &&
    typeof detail['total'] === 'number' &&
    typeof detail['percentComplete'] === 'number'
  ) {
    return detail as ProgressEventDetail;
  }

  return undefined;
}

export interface LoadImageParams {
  imageId: string;
  options?: object;
}

export interface ImageLoader {
  loadImage: (params: LoadImageParams) => Promise<cornerstone.Image>;
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

### \_\_stories\_\_/Analysis/Heatmap.stories.tsx


```tsx
import {
  CornerstoneImage,
  CornerstoneSingleImage,
  HeatmapViewer,
  InsightViewer,
  InsightViewerContainer,
  InsightViewerControllerOptions,
  InsightViewerTestController,
  installWADOImageLoader,
  unloadWADOImage,
  useInsightViewerSync,
  withInsightViewerStorybookGlobalStyle,
} from '@lunit/insight-viewer';
import { withOPTComponentsStorybookGlobalStyle } from '@lunit/opt-components';
import React, { useMemo, useState } from 'react';
import data from '../../__fixtures__/posMap.sample.json';

installWADOImageLoader();

export default {
  title: 'insight-viewer/Analysis',
  decorators: [withInsightViewerStorybookGlobalStyle, withOPTComponentsStorybookGlobalStyle],
};

export const Heatmap = () => {
  const image: CornerstoneImage = useMemo(
    () =>
      new CornerstoneSingleImage(`wadouri:https://lunit-frontend-fixtures.netlify.com/dcm-files/series/CT000010.dcm`, {
        unload: unloadWADOImage,
      }),
    [],
  );

  const [divElement, setDivElement] = useState<HTMLDivElement | null>(null);

  const { cornerstoneRenderData, updateCornerstoneRenderData } = useInsightViewerSync();

  return (
    <div>
      <InsightViewerTestController options={controllerOptions}>
        {({ width, height, invert, flip, control, wheel, resetTime }) => (
          <InsightViewerContainer ref={setDivElement} width={width} height={height}>
            <InsightViewer
              width={width}
              height={height}
              invert={invert}
              flip={flip}
              pan={control === 'pan' && divElement}
              adjust={control === 'adjust' && divElement}
              zoom={wheel === 'zoom' && divElement}
              resetTime={resetTime}
              image={image}
              updateCornerstoneRenderData={updateCornerstoneRenderData} // Render data를 받는다
            />
            <HeatmapViewer
              width={width}
              height={height}
              posMap={data.engine_result.engine_result.pos_map}
              threshold={0.1}
              cornerstoneRenderData={cornerstoneRenderData} // Render data를 전달한다
            />
          </InsightViewerContainer>
        )}
      </InsightViewerTestController>
    </div>
  );
};

const controllerOptions: InsightViewerControllerOptions = {
  width: [600, 400, 1000],
  height: [700, 400, 1000],
  control: ['pan', ['none', 'pan', 'adjust']],
  wheel: ['zoom', ['none', 'zoom']],
  flip: [false],
  invert: [false],
};

```


### \_\_stories\_\_/Annotation.Circle.stories.tsx


```tsx
import {
  CircleDrawer,
  CircleViewer,
  CornerstoneImage,
  CornerstoneSingleImage,
  InsightViewer,
  InsightViewerContainer,
  InsightViewerControllerOptions,
  InsightViewerTestController,
  installWADOImageLoader,
  unloadWADOImage,
  useContour,
  useInsightViewerSync,
  withInsightViewerStorybookGlobalStyle,
} from '@lunit/insight-viewer';
import { withOPTComponentsStorybookGlobalStyle } from '@lunit/opt-components';
import React, { useMemo, useState } from 'react';
import { initialContours, labelFunction } from '../__fixtures__/circle';

installWADOImageLoader();

export default {
  title: 'insight-viewer/Annotation/Circle',
  decorators: [withInsightViewerStorybookGlobalStyle, withOPTComponentsStorybookGlobalStyle],
};

const controllerOptions: InsightViewerControllerOptions = {
  width: [600, 400, 1000],
  height: [700, 400, 1000],
  control: ['pan', ['none', 'pan', 'adjust']],
  wheel: ['zoom', ['none', 'zoom']],
  flip: [false],
  invert: [false],
};

const controllerOptionsWithPen: InsightViewerControllerOptions = {
  ...controllerOptions,
  control: ['pen', ['none', 'pan', 'pen', 'adjust']],
};

export const Viewer = () => {
  const image: CornerstoneImage = useMemo(
    () =>
      new CornerstoneSingleImage(`wadouri:https://lunit-frontend-fixtures.netlify.com/dcm-files/series/CT000010.dcm`, {
        unload: unloadWADOImage,
      }),
    [],
  );

  const [divElement, setDivElement] = useState<HTMLDivElement | null>(null);

  const { cornerstoneRenderData, updateCornerstoneRenderData } = useInsightViewerSync();

  // create contour data
  const { contours, focusedContour } = useContour({
    mode: 'circle',
    initialContours,
  });

  return (
    <InsightViewerTestController options={controllerOptions}>
      {({ width, height, invert, flip, control, wheel, resetTime }) => (
        <InsightViewerContainer ref={setDivElement} width={width} height={height}>
          <InsightViewer
            width={width}
            height={height}
            invert={invert}
            flip={flip}
            pan={control === 'pan' && divElement}
            adjust={control === 'adjust' && divElement}
            zoom={wheel === 'zoom' && divElement}
            resetTime={resetTime}
            image={image}
            updateCornerstoneRenderData={updateCornerstoneRenderData}
          />
          {/* print contours */}
          {contours && contours.length > 0 && cornerstoneRenderData && (
            <CircleViewer
              width={width}
              height={height}
              contours={contours}
              focusedContour={focusedContour}
              cornerstoneRenderData={cornerstoneRenderData}
            />
          )}
        </InsightViewerContainer>
      )}
    </InsightViewerTestController>
  );
};

export const Drawer = () => {
  const image: CornerstoneImage = useMemo(
    () =>
      new CornerstoneSingleImage(`wadouri:https://lunit-frontend-fixtures.netlify.com/dcm-files/series/CT000010.dcm`, {
        unload: unloadWADOImage,
      }),
    [],
  );

  const [divElement, setDivElement] = useState<HTMLDivElement | null>(null);

  const { cornerstoneRenderData, updateCornerstoneRenderData } = useInsightViewerSync();

  // create contour data and user drawing behaviors
  const { contours, focusedContour, addContour, removeContour, focusContour } = useContour({
    mode: 'circle',
  });

  return (
    <InsightViewerTestController options={controllerOptionsWithPen}>
      {({ width, height, invert, flip, control, wheel, resetTime }) => (
        <InsightViewerContainer ref={setDivElement} width={width} height={height}>
          <InsightViewer
            width={width}
            height={height}
            invert={invert}
            flip={flip}
            pan={control === 'pan' && divElement}
            adjust={control === 'adjust' && divElement}
            zoom={wheel === 'zoom' && divElement}
            resetTime={resetTime}
            image={image}
            updateCornerstoneRenderData={updateCornerstoneRenderData}
          />
          {contours && contours.length > 0 && cornerstoneRenderData && (
            <CircleViewer
              width={width}
              height={height}
              contours={contours}
              focusedContour={focusedContour}
              cornerstoneRenderData={cornerstoneRenderData}
            />
          )}
          {/* user contour drawing */}
          {contours && cornerstoneRenderData && control === 'pen' && (
            <CircleDrawer
              width={width}
              height={height}
              contours={contours}
              draw={control === 'pen' && divElement}
              onFocus={focusContour}
              onAdd={contour => addContour(contour, { label: labelFunction })}
              onRemove={removeContour}
              cornerstoneRenderData={cornerstoneRenderData}
            />
          )}
        </InsightViewerContainer>
      )}
    </InsightViewerTestController>
  );
};

```


### \_\_stories\_\_/Annotation.Contour.stories.tsx


```tsx
import {
  ContourDrawer,
  ContourViewer,
  CornerstoneImage,
  CornerstoneSingleImage,
  InsightViewer,
  InsightViewerContainer,
  InsightViewerControllerOptions,
  InsightViewerTestController,
  installWADOImageLoader,
  unloadWADOImage,
  useContour,
  useInsightViewerSync,
  withInsightViewerStorybookGlobalStyle,
} from '@lunit/insight-viewer';
import { withOPTComponentsStorybookGlobalStyle } from '@lunit/opt-components';
import { color as d3color } from 'd3-color';
import React, { useMemo, useState } from 'react';
import styled, { css } from 'styled-components';
import { categoryColors, initialContours, labelFunction, seriesColors } from '../__fixtures__/contour';

installWADOImageLoader();

export default {
  title: 'insight-viewer/Annotation/Contour',
  decorators: [withInsightViewerStorybookGlobalStyle, withOPTComponentsStorybookGlobalStyle],
};

const controllerOptions: InsightViewerControllerOptions = {
  width: [600, 400, 1000],
  height: [700, 400, 1000],
  control: ['pan', ['none', 'pan', 'adjust']],
  wheel: ['zoom', ['none', 'zoom']],
  flip: [false],
  invert: [false],
};

const controllerOptionsWithPen: InsightViewerControllerOptions = {
  ...controllerOptions,
  control: ['pen', ['none', 'pan', 'pen', 'adjust']],
};

export const Viewer = () => {
  const image: CornerstoneImage = useMemo(
    () =>
      new CornerstoneSingleImage(`wadouri:https://lunit-frontend-fixtures.netlify.com/dcm-files/series/CT000010.dcm`, {
        unload: unloadWADOImage,
      }),
    [],
  );

  const [divElement, setDivElement] = useState<HTMLDivElement | null>(null);

  const { cornerstoneRenderData, updateCornerstoneRenderData } = useInsightViewerSync();

  // create contour data
  const { contours, focusedContour } = useContour({
    mode: 'contour',
    initialContours,
  });

  return (
    <InsightViewerTestController options={controllerOptions}>
      {({ width, height, invert, flip, control, wheel, resetTime }) => (
        <InsightViewerContainer ref={setDivElement} width={width} height={height}>
          <InsightViewer
            width={width}
            height={height}
            invert={invert}
            flip={flip}
            pan={control === 'pan' && divElement}
            adjust={control === 'adjust' && divElement}
            zoom={wheel === 'zoom' && divElement}
            resetTime={resetTime}
            image={image}
            updateCornerstoneRenderData={updateCornerstoneRenderData}
          />
          {/* print contours */}
          {contours && contours.length > 0 && cornerstoneRenderData && (
            <ContourViewer
              width={width}
              height={height}
              contours={contours}
              focusedContour={focusedContour}
              cornerstoneRenderData={cornerstoneRenderData}
            />
          )}
        </InsightViewerContainer>
      )}
    </InsightViewerTestController>
  );
};

export const Drawer = () => {
  const image: CornerstoneImage = useMemo(
    () =>
      new CornerstoneSingleImage(`wadouri:https://lunit-frontend-fixtures.netlify.com/dcm-files/series/CT000010.dcm`, {
        unload: unloadWADOImage,
      }),
    [],
  );

  const [divElement, setDivElement] = useState<HTMLDivElement | null>(null);

  const { cornerstoneRenderData, updateCornerstoneRenderData } = useInsightViewerSync();

  // create contour data and user drawing behaviors
  const { contours, focusedContour, addContour, removeContour, focusContour } = useContour();

  return (
    <InsightViewerTestController options={controllerOptionsWithPen}>
      {({ width, height, invert, flip, control, wheel, resetTime }) => (
        <InsightViewerContainer ref={setDivElement} width={width} height={height}>
          <InsightViewer
            width={width}
            height={height}
            invert={invert}
            flip={flip}
            pan={control === 'pan' && divElement}
            adjust={control === 'adjust' && divElement}
            zoom={wheel === 'zoom' && divElement}
            resetTime={resetTime}
            image={image}
            updateCornerstoneRenderData={updateCornerstoneRenderData}
          />
          {contours && contours.length > 0 && cornerstoneRenderData && (
            <ContourViewer
              width={width}
              height={height}
              contours={contours}
              focusedContour={focusedContour}
              cornerstoneRenderData={cornerstoneRenderData}
            />
          )}
          {/* user contour drawing */}
          {contours && cornerstoneRenderData && control === 'pen' && (
            <ContourDrawer
              width={width}
              height={height}
              contours={contours}
              draw={control === 'pen' && divElement}
              onFocus={focusContour}
              onAdd={contour => addContour(contour, { label: labelFunction })}
              onRemove={removeContour}
              cornerstoneRenderData={cornerstoneRenderData}
            />
          )}
        </InsightViewerContainer>
      )}
    </InsightViewerTestController>
  );
};

const CustomStyleViewer = styled(ContourViewer)`
  --contour-viewer-stroke-width: 10px;
  --contour-viewer-focused-stroke-width: 20px;

  --contour-viewer-color: blue;
  --contour-viewer-focused-color: red;
  --contour-viewer-fill-color: rgba(0, 0, 255, 0.3);
  --contour-viewer-focused-fill-color: rgba(255, 0, 0, 0.3);
`;

export const CustomizeViewer = () => {
  const image: CornerstoneImage = useMemo(
    () =>
      new CornerstoneSingleImage(`wadouri:https://lunit-frontend-fixtures.netlify.com/dcm-files/series/CT000010.dcm`, {
        unload: unloadWADOImage,
      }),
    [],
  );

  const [divElement, setDivElement] = useState<HTMLDivElement | null>(null);

  const { cornerstoneRenderData, updateCornerstoneRenderData } = useInsightViewerSync();

  // create contour data and user drawing behaviors
  const { contours, focusedContour, addContour, removeContour, focusContour } = useContour({
    initialContours,
  });

  return (
    <InsightViewerTestController options={controllerOptionsWithPen}>
      {({ width, height, invert, flip, control, wheel, resetTime }) => (
        <InsightViewerContainer ref={setDivElement} width={width} height={height}>
          <InsightViewer
            width={width}
            height={height}
            invert={invert}
            flip={flip}
            pan={control === 'pan' && divElement}
            adjust={control === 'adjust' && divElement}
            zoom={wheel === 'zoom' && divElement}
            resetTime={resetTime}
            image={image}
            updateCornerstoneRenderData={updateCornerstoneRenderData}
          />
          {contours && contours.length > 0 && cornerstoneRenderData && (
            <CustomStyleViewer
              width={width}
              height={height}
              contours={contours}
              focusedContour={focusedContour}
              cornerstoneRenderData={cornerstoneRenderData}
            />
          )}
          {/* user contour drawing */}
          {contours && cornerstoneRenderData && control === 'pen' && (
            <ContourDrawer
              width={width}
              height={height}
              contours={contours}
              draw={control === 'pen' && divElement}
              onFocus={focusContour}
              onAdd={contour => addContour(contour, { label: labelFunction })}
              onRemove={removeContour}
              cornerstoneRenderData={cornerstoneRenderData}
            />
          )}
        </InsightViewerContainer>
      )}
    </InsightViewerTestController>
  );
};

const CustomStyleDrawer = styled(ContourDrawer)`
  --contour-drawer-color: #99f4ac;
  --contour-drawer-fill-color: rgba(255, 255, 255, 0.4);
  --contour-drawer-stroke-width: 7px;
`;

export const CustomizeDrawer = () => {
  const image: CornerstoneImage = useMemo(
    () =>
      new CornerstoneSingleImage(`wadouri:https://lunit-frontend-fixtures.netlify.com/dcm-files/series/CT000010.dcm`, {
        unload: unloadWADOImage,
      }),
    [],
  );

  const [divElement, setDivElement] = useState<HTMLDivElement | null>(null);

  const { cornerstoneRenderData, updateCornerstoneRenderData } = useInsightViewerSync();

  // create contour data and user drawing behaviors
  const { contours, focusedContour, addContour, removeContour, focusContour } = useContour();

  return (
    <InsightViewerTestController options={controllerOptionsWithPen}>
      {({ width, height, invert, flip, control, wheel, resetTime }) => (
        <InsightViewerContainer ref={setDivElement} width={width} height={height}>
          <InsightViewer
            width={width}
            height={height}
            invert={invert}
            flip={flip}
            pan={control === 'pan' && divElement}
            adjust={control === 'adjust' && divElement}
            zoom={wheel === 'zoom' && divElement}
            resetTime={resetTime}
            image={image}
            updateCornerstoneRenderData={updateCornerstoneRenderData}
          />
          {contours && contours.length > 0 && cornerstoneRenderData && (
            <ContourViewer
              width={width}
              height={height}
              contours={contours}
              focusedContour={focusedContour}
              cornerstoneRenderData={cornerstoneRenderData}
            />
          )}
          {/* user contour drawing */}
          {contours && cornerstoneRenderData && control === 'pen' && (
            <CustomStyleDrawer
              width={width}
              height={height}
              contours={contours}
              draw={control === 'pen' && divElement}
              onFocus={focusContour}
              onAdd={contour => addContour(contour, { label: labelFunction })}
              onRemove={removeContour}
              cornerstoneRenderData={cornerstoneRenderData}
            />
          )}
        </InsightViewerContainer>
      )}
    </InsightViewerTestController>
  );
};

const categoryStyle = (category: string) => {
  const focusedColor =
    d3color(categoryColors[category])
      ?.brighter(3)
      .toString() || categoryColors[category];

  return css`
    > [data-category="${category}"] {
      --contour-viewer-color: ${categoryColors[category]};
      --contour-viewer-focused-color: ${focusedColor};
      --contour-viewer-fill-color: ${categoryColors[category]};
    }
  `;
};

const CategoryStyleViewer = styled(ContourViewer)`
  polygon {
    fill-opacity: 0.3;
  }

  ${Object.keys(categoryColors).map(categoryStyle)};
`;

export const CustomizeViewerByAttributes = () => {
  const image: CornerstoneImage = useMemo(
    () =>
      new CornerstoneSingleImage(`wadouri:https://lunit-frontend-fixtures.netlify.com/dcm-files/series/CT000010.dcm`, {
        unload: unloadWADOImage,
      }),
    [],
  );

  const [divElement, setDivElement] = useState<HTMLDivElement | null>(null);

  const { cornerstoneRenderData, updateCornerstoneRenderData } = useInsightViewerSync();

  // create contour data and user drawing behaviors
  const { contours, focusedContour, addContour, removeContour, focusContour } = useContour({
    initialContours,
  });

  return (
    <InsightViewerTestController options={controllerOptionsWithPen}>
      {({ width, height, invert, flip, control, wheel, resetTime }) => (
        <InsightViewerContainer ref={setDivElement} width={width} height={height}>
          <InsightViewer
            width={width}
            height={height}
            invert={invert}
            flip={flip}
            pan={control === 'pan' && divElement}
            adjust={control === 'adjust' && divElement}
            zoom={wheel === 'zoom' && divElement}
            resetTime={resetTime}
            image={image}
            updateCornerstoneRenderData={updateCornerstoneRenderData}
          />
          {contours && contours.length > 0 && cornerstoneRenderData && (
            <CategoryStyleViewer
              width={width}
              height={height}
              contours={contours}
              focusedContour={focusedContour}
              cornerstoneRenderData={cornerstoneRenderData}
            />
          )}
          {/* user contour drawing */}
          {contours && cornerstoneRenderData && control === 'pen' && (
            <ContourDrawer
              width={width}
              height={height}
              contours={contours}
              draw={control === 'pen' && divElement}
              onFocus={focusContour}
              onAdd={contour =>
                addContour(contour, {
                  label: labelFunction,
                  dataAttrs: { 'data-category': Math.random() > 0.5 ? 'normal' : 'abnormal' },
                })
              }
              onRemove={removeContour}
              cornerstoneRenderData={cornerstoneRenderData}
            />
          )}
        </InsightViewerContainer>
      )}
    </InsightViewerTestController>
  );
};

const orderStyle = (color: string, i: number) => {
  const focusedColor =
    d3color(color)
      ?.brighter(3)
      .toString() || color;

  return css`
    > [data-id="${i}"] {
      --contour-viewer-color: ${color};
      --contour-viewer-focused-color: ${focusedColor};
      --contour-viewer-fill-color: ${color};
    }
  `;
};

const OrderStyleViewer = styled(ContourViewer)`
  polygon {
    fill-opacity: 0.2;
  }

  ${seriesColors.map(orderStyle)};
`;

export const CustomizeViewerByOrder = () => {
  const image: CornerstoneImage = useMemo(
    () =>
      new CornerstoneSingleImage(`wadouri:https://lunit-frontend-fixtures.netlify.com/dcm-files/series/CT000010.dcm`, {
        unload: unloadWADOImage,
      }),
    [],
  );

  const [divElement, setDivElement] = useState<HTMLDivElement | null>(null);

  const { cornerstoneRenderData, updateCornerstoneRenderData } = useInsightViewerSync();

  // create contour data and user drawing behaviors
  const { contours, focusedContour, addContour, removeContour, focusContour } = useContour({
    initialContours,
  });

  return (
    <InsightViewerTestController options={controllerOptionsWithPen}>
      {({ width, height, invert, flip, control, wheel, resetTime }) => (
        <InsightViewerContainer ref={setDivElement} width={width} height={height}>
          <InsightViewer
            width={width}
            height={height}
            invert={invert}
            flip={flip}
            pan={control === 'pan' && divElement}
            adjust={control === 'adjust' && divElement}
            zoom={wheel === 'zoom' && divElement}
            resetTime={resetTime}
            image={image}
            updateCornerstoneRenderData={updateCornerstoneRenderData}
          />
          {contours && contours.length > 0 && cornerstoneRenderData && (
            <OrderStyleViewer
              width={width}
              height={height}
              contours={contours}
              focusedContour={focusedContour}
              cornerstoneRenderData={cornerstoneRenderData}
            />
          )}
          {/* user contour drawing */}
          {contours && cornerstoneRenderData && control === 'pen' && (
            <ContourDrawer
              width={width}
              height={height}
              contours={contours}
              draw={control === 'pen' && divElement}
              onFocus={focusContour}
              onAdd={contour => addContour(contour, { label: labelFunction })}
              onRemove={removeContour}
              cornerstoneRenderData={cornerstoneRenderData}
            />
          )}
        </InsightViewerContainer>
      )}
    </InsightViewerTestController>
  );
};

```


### \_\_stories\_\_/Annotation.Point.stories.tsx


```tsx
import {
  Contour,
  CornerstoneImage,
  CornerstoneSingleImage,
  InsightViewer,
  InsightViewerContainer,
  InsightViewerControllerOptions,
  InsightViewerTestController,
  installWADOImageLoader,
  PointViewer,
  unloadWADOImage,
  useContour,
  useInsightViewerSync,
  withInsightViewerStorybookGlobalStyle,
} from '@lunit/insight-viewer';
import { withOPTComponentsStorybookGlobalStyle } from '@lunit/opt-components';
import React, { useMemo, useState } from 'react';

function labelFunction({ id }: Contour): string {
  return 'p' + id;
}

const initialContours: Omit<Contour, 'id'>[] = [
  {
    label: labelFunction,
    polygon: [[100, 200]],
  },
  {
    label: labelFunction,
    polygon: [[200, 200]],
  },
];

installWADOImageLoader();

export default {
  title: 'insight-viewer/Annotation/Point',
  decorators: [withInsightViewerStorybookGlobalStyle, withOPTComponentsStorybookGlobalStyle],
};

const controllerOptions: InsightViewerControllerOptions = {
  width: [600, 400, 1000],
  height: [700, 400, 1000],
  control: ['pan', ['none', 'pan', 'adjust']],
  wheel: ['zoom', ['none', 'zoom']],
  flip: [false],
  invert: [false],
};

const controllerOptionsWithPen: InsightViewerControllerOptions = {
  ...controllerOptions,
  control: ['pen', ['none', 'pan', 'pen', 'adjust']],
};

export const Viewer = () => {
  const image: CornerstoneImage = useMemo(
    () =>
      new CornerstoneSingleImage(`wadouri:https://lunit-frontend-fixtures.netlify.com/dcm-files/series/CT000010.dcm`, {
        unload: unloadWADOImage,
      }),
    [],
  );

  const [divElement, setDivElement] = useState<HTMLDivElement | null>(null);

  const { cornerstoneRenderData, updateCornerstoneRenderData } = useInsightViewerSync();

  // create contour data
  const { contours, focusedContour, addContour, removeContour, focusContour } = useContour({
    mode: 'point',
    initialContours,
  });

  return (
    <InsightViewerTestController options={controllerOptionsWithPen}>
      {({ width, height, invert, flip, control, wheel, resetTime }) => (
        <InsightViewerContainer ref={setDivElement} width={width} height={height}>
          <InsightViewer
            width={width}
            height={height}
            invert={invert}
            flip={flip}
            pan={control === 'pan' && divElement}
            adjust={control === 'adjust' && divElement}
            zoom={wheel === 'zoom' && divElement}
            resetTime={resetTime}
            image={image}
            updateCornerstoneRenderData={updateCornerstoneRenderData}
          />
          {/* print contours */}
          {contours && cornerstoneRenderData && (
            <PointViewer
              width={width}
              height={height}
              contours={contours}
              interact={control === 'pen'}
              focusedContour={focusedContour}
              onFocus={focusContour}
              onAdd={polygon => addContour(polygon, { label: labelFunction })}
              onRemove={removeContour}
              cornerstoneRenderData={cornerstoneRenderData}
            />
          )}
        </InsightViewerContainer>
      )}
    </InsightViewerTestController>
  );
};

```


### \_\_stories\_\_/InsightViewer.stories.tsx


```tsx
import {
  CornerstoneBulkImage,
  CornerstoneImage,
  CornerstoneSeriesImage,
  CornerstoneSingleImage,
  HeatmapViewer,
  InsightViewer,
  InsightViewerContainer,
  InsightViewerControllerOptions,
  InsightViewerTestController,
  installWADOImageLoader,
  ProgressViewer,
  unloadImage,
  useBulkImagePosition,
  useBulkImageScroll,
  useInsightViewerSync,
  useViewportMirroring,
  withInsightViewerStorybookGlobalStyle,
} from '@lunit/insight-viewer';
import { withOPTComponentsStorybookGlobalStyle } from '@lunit/opt-components';
import React, { useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import data from '../__fixtures__/posMap.sample.json';
import series from '../__fixtures__/series.json';

installWADOImageLoader();

export default {
  title: 'insight-viewer/Insight Viewer',
  decorators: [withInsightViewerStorybookGlobalStyle, withOPTComponentsStorybookGlobalStyle],
};

const controllerOptions: InsightViewerControllerOptions = {
  width: [600, 400, 1000],
  height: [700, 400, 1000],
  control: ['pan', ['none', 'pan', 'adjust']],
  wheel: ['zoom', ['none', 'zoom']],
  flip: [false],
  invert: [false],
};

export const Basic = () => {
  // Dicom Viewer
  // Pan, Adjust, Zoom과 같은 기초적인 User Interaction 기능을 가지고 있다.
  const image: CornerstoneImage = useMemo(
    () =>
      new CornerstoneSingleImage(`wadouri:https://lunit-frontend-fixtures.netlify.com/dcm-files/series/CT000010.dcm`, {
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

export const InteractionWithHTMLElement = () => {
  const image: CornerstoneImage = useMemo(
    () =>
      new CornerstoneSingleImage(`wadouri:https://lunit-frontend-fixtures.netlify.com/dcm-files/series/CT000010.dcm`, {
        unload: unloadImage,
      }),
    [],
  );

  // pan, adjust, zoom props는 `boolean | HTMLElement | null` 값을 받을 수 있다.
  // `boolean`으로 입력되는 경우 `<InsightViewer>` 자체적으로 `MouseEvent`를 처리하지만,
  // `HTMLElement | null`로 입력되는 경우는 `MouseEvent` 처리를 입력된 `HTMLElement`를 사용하게 된다.
  //
  // `MouseEvent`의 위임은 `<InsightViewer>`, `<ContourDrawer>`와 같이 `MouseEvent`를 사용하는
  // 여러개의 Layer를 겹쳐서 사용해야 하는 경우, 하위에 위치한 Layer들의 `MouseEvent`가 차단되는 현상을 방지한다.
  const [divElement, setDivElement] = useState<HTMLDivElement | null>(null);

  return (
    <InsightViewerTestController options={controllerOptions}>
      {({ width, height, invert, flip, control, wheel, resetTime }) => (
        <InsightViewerContainer ref={setDivElement} width={width} height={height}>
          <InsightViewer
            width={width}
            height={height}
            invert={invert}
            flip={flip}
            pan={control === 'pan' && divElement} // divElement를 사용해서 Pan Interaction을 처리한다
            adjust={control === 'adjust' && divElement}
            zoom={wheel === 'zoom' && divElement}
            resetTime={resetTime}
            image={image}
            updateCornerstoneRenderData={() => {}}
          />
        </InsightViewerContainer>
      )}
    </InsightViewerTestController>
  );
};

export const ViewportSyncWithLayers = () => {
  const image: CornerstoneImage = useMemo(
    () =>
      new CornerstoneSingleImage(`wadouri:https://lunit-frontend-fixtures.netlify.com/dcm-files/series/CT000010.dcm`, {
        unload: unloadImage,
      }),
    [],
  );

  const [divElement, setDivElement] = useState<HTMLDivElement | null>(null);

  // 화면에 보여지는 여러개의 Layer들을 동기화 시킬 수 있다.
  const { cornerstoneRenderData, updateCornerstoneRenderData } = useInsightViewerSync();

  return (
    <InsightViewerTestController options={controllerOptions}>
      {({ width, height, invert, flip, control, wheel, resetTime }) => (
        <InsightViewerContainer ref={setDivElement} width={width} height={height}>
          <InsightViewer
            width={width}
            height={height}
            invert={invert}
            flip={flip}
            pan={control === 'pan' && divElement}
            adjust={control === 'adjust' && divElement}
            zoom={wheel === 'zoom' && divElement}
            resetTime={resetTime}
            image={image}
            updateCornerstoneRenderData={updateCornerstoneRenderData} // Render data를 받는다
          />
          <HeatmapViewer
            width={width}
            height={height}
            posMap={data.engine_result.engine_result.pos_map}
            threshold={0.1}
            cornerstoneRenderData={cornerstoneRenderData} // Render data를 전달한다
          />
        </InsightViewerContainer>
      )}
    </InsightViewerTestController>
  );
};

const controllerOptionsWithScroll: InsightViewerControllerOptions = {
  ...controllerOptions,
  wheel: ['scroll', ['none', 'zoom', 'scroll']],
};

export const SeriesImage = () => {
  // CT와 같이 여러개의 이미지를 연결해서 보여줘야 할 때 사용할 수 있다.
  const image: CornerstoneBulkImage = useMemo(
    () =>
      new CornerstoneSeriesImage(
        series.map(p => `wadouri:https://lunit-frontend-fixtures.netlify.com/dcm-files/series/${p}`),
        { unload: unloadImage },
      ),
    [],
  );

  const [divElement, setDivElement] = useState<HTMLDivElement | null>(null);
  const [scrollEnabled, setScrollEnabled] = useState<boolean>(false);

  // Wheel을 사용해서 SeriesImage의 위치를 제어한다
  useBulkImageScroll({
    image,
    element: divElement,
    enabled: scrollEnabled,
  });

  // 현재 SeriesImage의 위치와 전체 이미지 수량을 알 수 있다
  const { current, end } = useBulkImagePosition(image);

  return (
    <InsightViewerTestController options={controllerOptionsWithScroll}>
      {({ width, height, invert, flip, control, wheel, resetTime }) => {
        setScrollEnabled(wheel === 'scroll');

        return (
          <InsightViewerContainer ref={setDivElement} width={width} height={height}>
            <InsightViewer
              width={width}
              height={height}
              invert={invert}
              flip={flip}
              pan={control === 'pan' && divElement}
              adjust={control === 'adjust' && divElement}
              zoom={wheel === 'zoom' && divElement}
              resetTime={resetTime}
              image={image}
              updateCornerstoneRenderData={() => {}}
            />

            <RightTopHolder>
              {current} / {end}
            </RightTopHolder>

            <ProgressViewer image={image} width={width} height={height} />
          </InsightViewerContainer>
        );
      }}
    </InsightViewerTestController>
  );
};

const RightTopHolder = styled.div`
  position: absolute;
  right: 5px;
  top: 5px;
  font-size: 20px;
  color: #ffffff;
  pointer-events: none;
  user-select: none;
`;

const flexControllerOptions: InsightViewerControllerOptions = {
  width: [300, 200, 500],
  height: [400, 300, 600],
  control: 'pan',
  wheel: 'zoom',
  flip: [false],
  invert: [false],
};

export const ViewportMirroring = () => {
  const image1: CornerstoneImage = useMemo(
    () =>
      new CornerstoneSingleImage(`wadouri:https://lunit-frontend-fixtures.netlify.com/dcm-files/series/CT000010.dcm`, {
        unload: unloadImage,
      }),
    [],
  );

  const image2: CornerstoneImage = useMemo(
    () =>
      new CornerstoneSingleImage(`wadouri:https://lunit-frontend-fixtures.netlify.com/dcm-files/series/CT000020.dcm`, {
        unload: unloadImage,
      }),
    [],
  );

  const image3: CornerstoneImage = useMemo(
    () =>
      new CornerstoneSingleImage(`wadouri:https://lunit-frontend-fixtures.netlify.com/dcm-files/series/CT000030.dcm`, {
        unload: unloadImage,
      }),
    [],
  );

  const mirror2 = useRef<InsightViewer>(null);
  const mirror3 = useRef<InsightViewer>(null);

  // 여러개의 <InsightViewer>를 동기화 시킬 수 있다
  // Mirror로 등록된 <InsightViewer>들은 같은 사이즈를 가지고 있어야 한다
  const { updateMasterRenderData } = useViewportMirroring(mirror2, mirror3);

  return (
    <InsightViewerTestController options={flexControllerOptions}>
      {({ width, height, invert, flip, control, wheel, resetTime }) => (
        <div style={{ display: 'flex' }}>
          <InsightViewer
            width={width}
            height={height}
            invert={invert}
            flip={flip}
            pan={control === 'pan'}
            adjust={control === 'adjust'}
            zoom={wheel === 'zoom'}
            resetTime={resetTime}
            image={image1}
            updateCornerstoneRenderData={updateMasterRenderData} // Render Data를 받는다
          />
          <InsightViewer
            ref={mirror2} // Mirror를 설정한다
            width={width}
            height={height}
            invert={invert}
            flip={flip}
            pan={false}
            adjust={false}
            zoom={false}
            resetTime={0}
            image={image2}
            updateCornerstoneRenderData={() => {}}
          />
          <InsightViewer
            ref={mirror3} // Mirror를 설정한다
            width={width}
            height={height}
            invert={invert}
            flip={flip}
            pan={false}
            adjust={false}
            zoom={false}
            resetTime={0}
            image={image3}
            updateCornerstoneRenderData={() => {}}
          />
        </div>
      )}
    </InsightViewerTestController>
  );
};

export const MulticastImage = () => {
  const image: CornerstoneImage = useMemo(
    () =>
      new CornerstoneSingleImage(`wadouri:https://lunit-frontend-fixtures.netlify.com/dcm-files/series/CT000010.dcm`, {
        unload: unloadImage,
      }),
    [],
  );

  // 하나의 CornerstoneImage를 여러개의 <InsightViewer>에서 사용해도 문제 없다
  return (
    <InsightViewerTestController options={flexControllerOptions}>
      {({ width, height, invert, flip, control, wheel, resetTime }) => (
        <div style={{ display: 'flex' }}>
          <InsightViewer
            width={width}
            height={height}
            invert={invert}
            flip={flip}
            pan={control === 'pan'}
            adjust={control === 'adjust'}
            zoom={wheel === 'zoom'}
            resetTime={resetTime}
            image={image}
            updateCornerstoneRenderData={() => {}}
          />
          <InsightViewer
            width={width}
            height={height}
            invert={invert}
            flip={flip}
            pan={control === 'pan'}
            adjust={control === 'adjust'}
            zoom={wheel === 'zoom'}
            resetTime={resetTime}
            image={image}
            updateCornerstoneRenderData={() => {}}
          />
          <InsightViewer
            width={width}
            height={height}
            invert={invert}
            flip={flip}
            pan={control === 'pan'}
            adjust={control === 'adjust'}
            zoom={wheel === 'zoom'}
            resetTime={resetTime}
            image={image}
            updateCornerstoneRenderData={() => {}}
          />
        </div>
      )}
    </InsightViewerTestController>
  );
};

```


### \_\_stories\_\_/Loaders/WebImage.stories.tsx


```tsx
import {
  CornerstoneImage,
  CornerstoneSingleImage,
  InsightViewer,
  InsightViewerControllerOptions,
  InsightViewerTestController,
  installWebImageLoader,
  withInsightViewerStorybookGlobalStyle,
} from '@lunit/insight-viewer';
import { withOPTComponentsStorybookGlobalStyle } from '@lunit/opt-components';
import React, { useMemo } from 'react';

installWebImageLoader();

export default {
  title: 'insight-viewer/Insight Viewer',
  decorators: [withInsightViewerStorybookGlobalStyle, withOPTComponentsStorybookGlobalStyle],
};

const controllerOptions: InsightViewerControllerOptions = {
  width: [600, 400, 1000],
  height: [700, 400, 1000],
  control: ['pan', ['none', 'pan', 'adjust']],
  wheel: ['zoom', ['none', 'zoom']],
  flip: [false],
  invert: [false],
};

export const WebImage = () => {
  // Dicom Viewer
  // Pan, Adjust, Zoom과 같은 기초적인 User Interaction 기능을 가지고 있다.
  const image: CornerstoneImage = useMemo(
    () => new CornerstoneSingleImage(`https://lunit-frontend-fixtures.netlify.com/dcm-files/series/CT000010.png`),
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

```


### \_\_stories\_\_/Utils/DCMImage.stories.tsx


```tsx
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

// ===========================================
// DCMImage
// `<DCMImage>`를 사용해서 좀 더 간단하게 Dicom File을 출력할 수 있다.
// 하지만, `.dcm` 파일의 용량 및 렌더링 비용이 너무 크기 때문에
// 가능하다면 `.jpg` 썸네일 이미지를 만들어서 사용하는 것이 더 좋다.
// ===========================================

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

```


### \_\_stories\_\_/Utils/ProgressCollector.stories.tsx


```tsx
import {
  CornerstoneImage,
  CornerstoneSingleImage,
  InsightViewer,
  InsightViewerContainer,
  InsightViewerControllerOptions,
  InsightViewerControllerState,
  InsightViewerTestController,
  installWADOImageLoader,
  ProgressCollector,
  ProgressViewer,
  unloadWADOImage,
  useContainerStyleOfProgressViewersInactivity,
  useProgressViewersActivity,
  withInsightViewerStorybookGlobalStyle,
} from '@lunit/insight-viewer';
import { withOPTComponentsStorybookGlobalStyle } from '@lunit/opt-components';
import { storiesOf } from '@storybook/react';
import React, { CSSProperties, useMemo } from 'react';

installWADOImageLoader();

const controllerOptions: InsightViewerControllerOptions = {
  width: [250, 200, 600],
  height: [300, 200, 800],
  control: ['pan', ['none', 'pan', 'adjust']],
  wheel: ['zoom', ['none', 'zoom']],
  flip: [false],
  invert: [false],
};

function Sample() {
  // <ProgressCollector>는 하위의 <ProgressViewer>들의 상태를 수집한다
  return (
    <ProgressCollector>
      <Container />
    </ProgressCollector>
  );
}

function Container() {
  const images: CornerstoneImage[] = useMemo(() => {
    return [
      'wadouri:https://lunit-frontend-fixtures.netlify.com/dcm-files/series/CT000010.dcm',
      `wadouri:https://lunit-frontend-fixtures.netlify.com/dcm-files/series/CT000011.dcm`,
      `wadouri:https://lunit-frontend-fixtures.netlify.com/dcm-files/series/CT000012.dcm`,
      `wadouri:https://lunit-frontend-fixtures.netlify.com/dcm-files/series/CT000013.dcm`,
    ].map(imageId => new CornerstoneSingleImage(imageId, { unload: unloadWADOImage }));
  }, []);

  // <ProgressCollector>에서 수집한 정보를 얻을 수 있다
  const progressActivity: boolean = useProgressViewersActivity();
  // 혹은 <ProgressViewer>가 동작중일때 비활성을 처리할 Style을 만들 수 있다
  const containerDisabledStyle: CSSProperties = useContainerStyleOfProgressViewersInactivity({
    pointerEvents: 'none',
  });

  return (
    <InsightViewerTestController options={controllerOptions}>
      {controllerStates => (
        <div style={containerDisabledStyle}>
          <div style={{ display: 'flex' }}>
            {images.map(image => (
              <Component image={image} {...controllerStates} />
            ))}
          </div>
          <p>
            {progressActivity
              ? '<ProgressViewer>가 하나 이상 작동 중입니다!!!'
              : '동작중인 <ProgressViewer>가 없습니다!!!'}
          </p>
        </div>
      )}
    </InsightViewerTestController>
  );
}

function Component({
  image,
  width,
  height,
  invert,
  flip,
  control,
  wheel,
  resetTime,
}: { image: CornerstoneImage } & InsightViewerControllerState) {
  return (
    <InsightViewerContainer width={width} height={height}>
      <InsightViewer
        width={width}
        height={height}
        invert={invert}
        flip={flip}
        pan={control === 'pan'}
        adjust={control === 'adjust'}
        zoom={wheel === 'zoom'}
        resetTime={resetTime}
        image={image}
        updateCornerstoneRenderData={() => {}}
      />
      {/* 이 <ProgressViewer>가 <ProgressCollector>에 수집된다 */}
      <ProgressViewer image={image} width={width} height={height} />
    </InsightViewerContainer>
  );
}

storiesOf('insight-viewer/Utils', module)
  .addDecorator(withOPTComponentsStorybookGlobalStyle)
  .addDecorator(withInsightViewerStorybookGlobalStyle)
  .add('<ProgressCollector>', () => <Sample />);

```


### \_\_stories\_\_/Utils/useImageStore.stories.tsx


```tsx
import {
  CornerstoneImage,
  ImageStoreProvider,
  InsightViewer,
  InsightViewerControllerOptions,
  InsightViewerTestController,
  installWADOImageLoader,
  useImageProgress,
  useImageStore,
  withInsightViewerStorybookGlobalStyle,
} from '@lunit/insight-viewer';
import { withOPTComponentsStorybookGlobalStyle } from '@lunit/opt-components';
import { storiesOf } from '@storybook/react';
import React, { useState } from 'react';

installWADOImageLoader();

const controllerOptions: InsightViewerControllerOptions = {
  width: [600, 400, 1000],
  height: [700, 400, 1000],
  control: ['pan', ['none', 'pan', 'adjust']],
  wheel: ['zoom', ['none', 'zoom']],
  flip: [false],
  invert: [false],
};

const Sample = () => {
  const { fetch } = useImageStore();

  const image1: CornerstoneImage = fetch(
    `wadouri:https://lunit-frontend-fixtures.netlify.com/dcm-files/series/CT000010.dcm`,
  );
  const image2: CornerstoneImage = fetch(
    `wadouri:https://lunit-frontend-fixtures.netlify.com/dcm-files/series/CT000011.dcm`,
  );
  const image3: CornerstoneImage = fetch(
    `wadouri:https://lunit-frontend-fixtures.netlify.com/dcm-files/series/CT000012.dcm`,
  );
  const image4: CornerstoneImage = fetch(
    `wadouri:https://lunit-frontend-fixtures.netlify.com/dcm-files/series/CT000013.dcm`,
  );

  const progress1 = useImageProgress(image1);
  const progress2 = useImageProgress(image2);
  const progress3 = useImageProgress(image3);
  const progress4 = useImageProgress(image4);

  const [image, setImage] = useState<CornerstoneImage>(() => image1);

  return (
    <div style={{ display: 'flex' }}>
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
      <div>
        <ul>
          <li>
            1: {progress1 || 'loaded'}
            {image !== image1 && <button onClick={() => setImage(image1)}>show</button>}
          </li>
          <li>
            2: {progress2 || 'loaded'}
            {image !== image2 && <button onClick={() => setImage(image2)}>show</button>}
          </li>
          <li>
            3: {progress3 || 'loaded'}
            {image !== image3 && <button onClick={() => setImage(image3)}>show</button>}
          </li>
          <li>
            4: {progress4 || 'loaded'}
            {image !== image4 && <button onClick={() => setImage(image4)}>show</button>}
          </li>
        </ul>
      </div>
    </div>
  );
};

storiesOf('insight-viewer/Utils', module)
  .addDecorator(withOPTComponentsStorybookGlobalStyle)
  .addDecorator(withInsightViewerStorybookGlobalStyle)
  .addDecorator(storyFn => <ImageStoreProvider>{storyFn()}</ImageStoreProvider>)
  .add('useImageStore()', () => <Sample />);

```

<!-- importend -->

## Tests

<!-- import __tests__/*.{ts,tsx} --title-tag h3 -->

### \_\_tests\_\_/useContour.test.ts


```ts
import { useContour } from '@lunit/insight-viewer';
import { act, renderHook } from '@testing-library/react-hooks';
import { initialContours } from '../__fixtures__/contour';

describe('userContour()', () => {
  test('should not change the references of the all callbacks', () => {
    const { result } = renderHook(() => useContour());

    const { addContour, addContours, updateContour, removeAllContours, removeContour, focusContour } = result.current;

    function testCallbackReferenceChanging(current: typeof result.current) {
      expect(current.addContour).toBe(addContour);
      expect(current.addContours).toBe(addContours);
      expect(current.updateContour).toBe(updateContour);
      expect(current.removeContour).toBe(removeContour);
      expect(current.removeAllContours).toBe(removeAllContours);
      expect(current.focusContour).toBe(focusContour);
    }

    expect(result.current.contours).toHaveLength(0);
    testCallbackReferenceChanging(result.current);

    act(() => void result.current.addContour(initialContours[0].polygon));

    expect(result.current.contours).toHaveLength(1);
    testCallbackReferenceChanging(result.current);

    act(() => result.current.addContours([initialContours[1], initialContours[2]]));

    expect(result.current.contours).toHaveLength(3);
    testCallbackReferenceChanging(result.current);

    act(() => void result.current.focusContour(result.current.contours[1]));

    expect(result.current.contours).toHaveLength(3);
    expect(result.current.focusedContour).toBe(result.current.contours[1]);
    testCallbackReferenceChanging(result.current);

    act(() => void result.current.focusContour(null));

    expect(result.current.contours).toHaveLength(3);
    expect(result.current.focusedContour).toBe(null);
    testCallbackReferenceChanging(result.current);

    act(() => void result.current.updateContour(result.current.contours[0], { label: 'foo' }));

    expect(result.current.contours).toHaveLength(3);
    expect(result.current.contours[0].label).toBe('foo');
    testCallbackReferenceChanging(result.current);

    act(() => result.current.removeContour(result.current.contours[1]));

    expect(result.current.contours).toHaveLength(2);
    testCallbackReferenceChanging(result.current);

    act(() => result.current.removeAllContours());

    expect(result.current.contours).toHaveLength(0);
    testCallbackReferenceChanging(result.current);
  });
});

```

<!-- importend -->

# Changelog

## 3.6.0
### Added
- `<InsightViewerTestController>` 추가

## 3.5.0
### Added
- `useBulkImagePosition()` 추가

## 3.4.0
### Added
- `<ThumbnailImage>` 추가
- `useImageStore()` 추가

## 3.3.0
### Added
- `<CircleDrawer>`, `<ContourDrawer>`에 Animation Effect 추가. `animateStroke={fasle}`로 비활성 가능

## 3.2.0
### Added
- `<UserPointViewer>` → `<PointViewer>`
- `<UserCircleViewer>` → `<CircleViewer>`
- `<UserCircleDrawer>` → `<CircleDrawer>`
- `<UserContourViewer>` → `<ContourViewer>`
- `<UserContourDrawer>` → `<ContourDrawer>`
- `<MachineHeatmapViewer>` → `<HeatmapViewer>`
- CSS Variables 적용

## 3.1.0
### Fixed
- Zoom Page가 Scroll 되는 경우 위치 계산 잘못하는 문제 수정

### Added
- `<UserPointViewer pointPinComponent={} />`를 `((contour: T) => ComponentType<PointPinProps>) | ComponentType<PointPinProps>`로 확장
- `<UserContourViewer border={false} />` 기본 Style 변경 및 `border` 제외 옵션 추가
- `<UserCircleViewer border={false} />` 기본 Style 변경 및 `border` 제외 옵션 추가

## 3.0.0
### Added
- Zoom, Adjust 단축키 구현을 위한 `updateViewport()`, `zoomMiddleLeft()`, `zoomMiddleRight()`, `zoomMiddleCenter()`, `adjustWindowCenter()`, `adjustWindowWidth()` 추가
- `<InsightViewer defaultViewportTransforms={} />` 추가
- `useImageLoadedTime()` 추가

### Fixed
- Zoom 속도 보정 (`deltaY * 0.03` → `(deltaY > 0 ? 1 : -1) * 0.03`)
- Cornerstone `loadImage()` 실패를 위한 Retry 추가 (5000ms) 

### Breaking Changes
- `ContourInfo` Type이 삭제됨
- `Contour`를 사용하는 모든 `@lunit/insight-viewer` Component들이 `<T extends Contour>` 형태로 변경됨
- `Contour` Type에 의한 문제는 JS의 경우 애초에 Type에 의한 제한이 없기 때문에 큰 문제가 없고, TS의 경우 Compile Error가 발생할 여지가 있음 
- `useUserContour()` hook 의 `addContour()` arguments 가 `addContour: (polygon: Point[], contourInfo?: Omit<T, 'id' | 'polygon'>) => T | null;`로 변경됨
- 기존 `addContour(polygon, 0, label...)`과 같이 사용하던 것을 `addContour(polygon, {label, dataAttrs...})`와 같이 변경해 줘야함
- `addContour()`를 사용하지 않은 경우, 또는 2번째 이후의 인자를 넘기지 않는 형태로 사용한 경우 영향이 없음

## 2.6.1
### Fixed
- `<DCMImage>`에서 WebGL 사용하지 않도록 변경 (WebGL Context 수량 제한 회피)

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