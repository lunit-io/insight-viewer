import { events, Image, loadImage } from 'cornerstone-core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CornerstoneImage, getProgressEventDetail, ProgressEventDetail } from './types';
import { wadoImageLoaderXHRLoader } from './wadoImageLoaderXHRLoader';

interface Options {
  unload?: (imageId: string) => void;
  cancelTokenName?: string;
}

export class CornerstoneSingleImage implements CornerstoneImage {
  private readonly _imageSubject: BehaviorSubject<Image | null>;
  private readonly _progressSubject: BehaviorSubject<number>;
  private readonly _cancel: (() => void)[] = [];
  
  constructor(private readonly imageId: string, private readonly options: Options = {}) {
    this._imageSubject = new BehaviorSubject<Image | null>(null);
    this._progressSubject = new BehaviorSubject(0);
    
    events.addEventListener('cornerstoneimageloadprogress', this.onProgress);
    this.loadImage(imageId);
  }
  
  onProgress = (event: Event) => {
    const eventDetail: ProgressEventDetail | undefined = getProgressEventDetail(event);
    
    if (eventDetail && eventDetail.imageId === this.imageId) {
      this._progressSubject.next(eventDetail.loaded / eventDetail.total);
    }
  };
  
  destroy = () => {
    if (this.options && typeof this.options.unload === 'function') {
      this.options.unload(this.imageId);
    }
    
    this._cancel.forEach(cancel => cancel());
  };
  
  get image(): Observable<Image | null> {
    return this._imageSubject.asObservable();
  }
  
  get progress(): Observable<number> {
    return this._progressSubject.asObservable();
  }
  
  private loadImage = async (imageId: string) => {
    const image = await loadImage(imageId, {loader: wadoImageLoaderXHRLoader(cancel => this._cancel.push(cancel))});
    this._imageSubject.next(image);
    this._progressSubject.next(1);
    events.removeEventListener('cornerstoneimageloadprogress', this.onProgress);
  };
}