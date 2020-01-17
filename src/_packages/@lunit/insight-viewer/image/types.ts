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

export interface LoadImageParams {
  imageId: string;
  options?: object;
}

export interface ImageLoader {
  loadImage: (params: LoadImageParams) => Promise<Image>;
}