import { events, Image, loadImage } from 'cornerstone-core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CornerstoneBulkImage, getProgressEventDetail, ProgressEventDetail } from './types';

function isImage(image: Image | null): image is Image {
  return image !== null;
}

interface Options {
  unload?: (imageIds: string[]) => void;
  initialIndex?: number;
}

export class CornerstoneSeriesImage implements CornerstoneBulkImage {
  private readonly _images: (Image | null)[];
  private readonly _imageSubject: BehaviorSubject<Image | null>;
  private readonly _progressSubject: BehaviorSubject<number[]>;
  private readonly _indexSubject: BehaviorSubject<number>;
  
  constructor(private readonly imageIds: string[], private readonly options: Options = {}) {
    this._images = imageIds.map(() => null);
    
    const {initialIndex = 0} = options;
    
    this._imageSubject = new BehaviorSubject<Image | null>(null);
    this._indexSubject = new BehaviorSubject<number>(initialIndex);
    this._progressSubject = new BehaviorSubject(imageIds.map(() => 0));
    
    events.addEventListener('cornerstoneimageloadprogress', this.onProgress);
    
    this.loadImage(imageIds[initialIndex], initialIndex).then(() => {
      // 최초 image를 next로 보내준다
      this.change(this._indexSubject.getValue());
      
      imageIds.forEach((imageId, i) => {
        // initialDisplayIndex는 이미 로딩했으므로 pass한다
        if (i !== initialIndex) {
          this.loadImage(imageId, i).then(() => {
            // 현재 시점의 displayIndex이면 (displayIndex의 교체 -> loadImage의 순서로 실행되었다면)
            // next로 보내준다
            if (i === this._indexSubject.getValue()) {
              this.change(this._indexSubject.getValue());
            }
          });
        }
      });
    });
  }
  
  onProgress = (event: Event) => {
    const eventDetail: ProgressEventDetail | undefined = getProgressEventDetail(event);
    
    if (eventDetail) {
      const imageIndex: number = this.imageIds.indexOf(eventDetail.imageId);
      
      if (imageIndex > -1) {
        const nextProgress: number[] = [...this._progressSubject.getValue()];
        nextProgress[imageIndex] = eventDetail.loaded / eventDetail.total;
        this._progressSubject.next(nextProgress);
      }
    }
  };
  
  destroy = () => {
    if (this.options && typeof this.options.unload === 'function') {
      this.options.unload(this.imageIds);
    }
    this._imageSubject.unsubscribe();
  };
  
  get image(): Observable<Image | null> {
    return this._imageSubject.asObservable();
  }
  
  get progress(): Observable<number> {
    return this._progressSubject.pipe<number>(
      map<number[], number>(progress => progress.reduce((t, x) => t + x, 0) / progress.length),
    );
  }
  
  get index(): Observable<number> {
    return this._indexSubject.asObservable();
  }
  
  length = (): number => {
    return this._images.length;
  };
  
  getIndex = (): number => {
    return this._indexSubject.getValue();
  };
  
  goto = (value: number) => {
    this.change(Math.max(0, Math.min(this._images.length - 1, value)));
  };
  
  next = (delta: number = 1) => {
    this.change(Math.min(this._images.length - 1, this._indexSubject.getValue() + delta));
  };
  
  prev = (delta: number = 1) => {
    this.change(Math.max(0, this._indexSubject.getValue() - delta));
  };
  
  private change = (index: number) => {
    this._indexSubject.next(index);
    
    // 해당 image가 load 되었으면 보여준다
    if (this._images[index]) {
      this._imageSubject.next(this._images[index]);
      return;
    }
    
    // load되지 않은 image를 보려하는 경우 가까운 index의 이미지를 먼저 보여준다
    
    const before: Image[] = this._images.slice(0, index - 1).filter<Image>(isImage).reverse();
    
    if (before.length > 0) {
      this._imageSubject.next(before[0]);
      return;
    }
    
    const after: Image[] = this._images.slice(index + 1).filter<Image>(isImage);
    
    if (after.length > 0) {
      this._imageSubject.next(after[0]);
      return;
    }
    
    console.warn('대체할 Image를 찾을 수 없음');
  };
  
  private loadImage = async (imageId: string, index: number) => {
    this._images[index] = await loadImage(imageId);
    
    const nextProgress: number[] = [...this._progressSubject.getValue()];
    nextProgress[index] = 1;
    this._progressSubject.next(nextProgress);
  };
}