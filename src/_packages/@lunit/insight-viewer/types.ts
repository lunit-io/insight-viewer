//export type CornerstoneRenderData = Required<
//  Pick<
//    cornerstone.CornerstoneEventData,
//    'canvasContext' | 'element' | 'enabledElement' | 'image' | 'renderTimeInMs' | 'viewport'
//  >
//>;

export interface CornerstoneRenderData {
  /** cornerstone이 그림을 그리고 있는 CanvasRenderingContext2D */
  canvasContext: CanvasRenderingContext2D;

  /** cornerstone이 그림을 그리고 있는 HTMLElement */
  element: HTMLElement;

  /**
   * cornerstone의 Rendering에 관련된 정보들
   *
   * - <HeatmapViewer>, <ContourViewer> 등 <InsightViewer>와 화면을 동기화 시키는 기능을 만들 때 사용된다.
   * - 그 외, 잡다한 Rendering에 관련된 거의 대부분의 정보들을 얻을 수 있다
   */
  enabledElement: cornerstone.EnabledElement;

  /**
   * cornerstone이 화면에 그리고 있는 Image 객체
   * interface CornerstoneImage 와 연관된다
   *
   * @see CornerstoneImage.image
   */
  image: cornerstone.Image;

  renderTimeInMs: number;

  /**
   * cornerstone이 화면에 그리고 있는 Viewport 상태
   *
   * - useViewportMirroring()과 같이 <InsightViewer>들의 화면을 동기화 시키는 기능을 만들 때 사용된다.
   * - 그 외, 현재 cornerstone 화면 상태에 대한 거의 대부분의 정보들으 얻을 수 있다
   */
  viewport: cornerstone.Viewport;
}

/** [x, y] */
export type Point = [number, number];

/**
 * UserContoureViewer와 같은 곳에서 사용된다
 *
 * Annotation Tool, OPT 등 Annotation을 해야 하는 상황에서 데이터가 된다.
 *
 * 직접 사용하지 말고, 내부적으로 상속해서 새로운 데이터를 생성해야 한다.
 */
export interface Contour {
  /** 일종의 label 역할을 한다 */
  id: number;

  /**
   * Mode에 따라 사용하는 방식이 다르다
   * - (mode: contour) = [[x, y], [x, y], [x, y]...]
   * - (mode: circle) = [[centerX, centerY][radius, ]]
   * - (mode: point) = [[x, y]]
   */
  polygon: Point[];

  /** 존재하는 경우 id 대신 출력된다 */
  label?: ((contour: this) => string) | string;

  /**
   * svg element에 data-* 형식의 attribute를 넣어주게 된다.
   * 해당 attribute들을 기준으로 css styling과 같은 기능들을 구현할 수 있다.
   */
  dataAttrs?: { [attr: string]: string };
}

export interface ViewportTransformParams {
  element: HTMLElement;
  minScale: number;
  maxScale: number;
  currentViewport: cornerstone.Viewport | null;
}

export type ViewportTransform = (params: ViewportTransformParams) => Partial<cornerstone.Viewport> | undefined;

export interface CornerstoneViewerLike {
  getMinScale: () => number;
  getMaxScale: () => number;
  getElement: () => HTMLElement;
  getContentWindow: () => Window;
  getCurrentViewport: () => cornerstone.Viewport;
  updateViewport: (patch: Partial<cornerstone.Viewport>) => void;
  getViewportTransformParams: () => ViewportTransformParams;
}

export type Interaction = (viewer: CornerstoneViewerLike) => () => void;
