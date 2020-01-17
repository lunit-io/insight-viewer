import { events, Image } from 'cornerstone-core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ParallelImageLoader } from './ParallelImageLoader';
import { CornerstoneImage, getProgressEventDetail, ImageLoader, ProgressEventDetail } from './types';
import { wadoImageLoaderXHRLoader } from './wadoImageLoaderXHRLoader';

interface Options {
  timeout?: number;
  unload?: (imageId: string) => void;
  cancelTokenName?: string;
  loader?: ImageLoader;
}

const defaultLoader: ImageLoader = new ParallelImageLoader();

export class CornerstoneSingleImage implements CornerstoneImage {
  private readonly _imageSubject: BehaviorSubject<Image | null>;
  private readonly _progressSubject: BehaviorSubject<number>;
  private readonly _cancel: (() => void)[] = [];
  private readonly _loader: ImageLoader;
  private _destoyed: boolean = false;
  
  constructor(private readonly imageId: string, private readonly options: Options = {}) {
    this._imageSubject = new BehaviorSubject<Image | null>(null);
    this._progressSubject = new BehaviorSubject(0);
    this._loader = options.loader || defaultLoader;
    
    events.addEventListener('cornerstoneimageloadprogress', this.onProgress);
    this.loadImage(imageId);
  }
  
  onProgress = (event: Event) => {
    const eventDetail: ProgressEventDetail | undefined = getProgressEventDetail(event);
    
    if (eventDetail && eventDetail.imageId === this.imageId) {
      this._progressSubject.next(Math.min(eventDetail.loaded / eventDetail.total, 0.99));
    }
  };
  
  destroy = () => {
    if (this.options && typeof this.options.unload === 'function') {
      this.options.unload(this.imageId);
    }
    
    events.removeEventListener('cornerstoneimageloadprogress', this.onProgress);
    
    this._cancel.forEach(cancel => cancel());
    
    this._destoyed = true;
  };
  
  get image(): Observable<Image | null> {
    return this._imageSubject.asObservable();
  }
  
  get progress(): Observable<number> {
    return this._progressSubject.asObservable();
  }
  
  private loadImage = async (imageId: string) => {
    try {
      const image = await this._loader.loadImage({
        imageId: imageId,
        options: {loader: wadoImageLoaderXHRLoader(cancel => this._cancel.push(cancel))},
      });
      
      events.removeEventListener('cornerstoneimageloadprogress', this.onProgress);
      
      if (!this._destoyed) {
        this._imageSubject.next(image);
        this._progressSubject.next(1);
      }
    } catch (error) {
      if (!this._destoyed) {
        console.warn(`It will retry loadImage(${imageId}):`, error);
        this.loadImage(imageId);
      }
    }
  };
}