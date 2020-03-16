cornerstone 등 OPT 기능을 구현하기 위한 여러 graphics layer를 구현한다.

# Install

```sh
npm install @lunit/insight-viewer
```

# Usage

<https://frontend-components-handbook.netlify.com/#/insight-viewer/getting-started>

# Changelog

## 4.0.0
### Fixed
- `invert={true} flip={true}` 기본값 적용 안되는 문제 수정

### Breaking Changes
- 기본 세팅 방식 변경

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