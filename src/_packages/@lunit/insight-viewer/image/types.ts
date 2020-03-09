import { Observable } from 'rxjs';

export interface CornerstoneImage {
  /** cornerstoneImage.image.subscribe() 로 cornerstone.Image를 받을 수 있다 */
  readonly image: Observable<cornerstone.Image | null>;
  /** cornerstoneImage.progress.subscribe() 로 로딩 상태를 0 ~ 1의 값으로 얻을 수 있다 */
  readonly progress: Observable<number>;
  /** cornerstoneImage.destroy() 로 현재 Image를 Cache에서 삭제한다 */
  destroy: () => void;
}

/** @deprecated use just CornerstoneSeriesImage */
export interface CornerstoneBulkImage extends CornerstoneImage {
  /** 총 이미지 갯수 */
  length: () => number;
  /** 현재 보여주고 있는 Image의 index number */
  getIndex: () => number;
  /** cornerstoneImage.index.subscribe() 로 현재 보여주고 있는 Image의 index number를 받을 수 있다 */
  readonly index: Observable<number>;
  /** 다음 Image 보기 */
  next: (delta?: number) => void;
  /** 이전 Image 보기 */
  prev: (delta?: number) => void;
  /** 특정 index number의 Image 보기 */
  goto: (index: number) => void;
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
