import { CornerstoneSequenceImage } from '@lunit/insight-viewer';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

export class CornerstoneStaticSeriesImage implements CornerstoneSequenceImage {
  private readonly _imageSubject: BehaviorSubject<cornerstone.Image | null>;
  private readonly _indexSubject: BehaviorSubject<number>;
  private readonly _imagesSubscription: Subscription;
  private readonly _progress: Observable<number>;
  private _images: cornerstone.Image[] | null = null;

  constructor({
    progress,
    images,
    initialIndex = 'center',
  }: {
    progress: Observable<number>;
    images: Observable<cornerstone.Image[]>;
    initialIndex?: number | 'start' | 'center' | 'end';
  }) {
    this._imagesSubscription = images.subscribe((images) => {
      this._images = images;

      let index: number;

      if (initialIndex === 'start') {
        index = 0;
      } else if (initialIndex === 'center') {
        index = Math.round(images.length / 2);
      } else if (initialIndex === 'end') {
        index = images.length - 1;
      } else {
        index = initialIndex;
      }

      this._imageSubject.next(images[index]);
      this._indexSubject.next(index);

      // subscribe once
      this._imagesSubscription.unsubscribe();
    });

    this._progress = progress;
    this._imageSubject = new BehaviorSubject<cornerstone.Image | null>(null);
    this._indexSubject = new BehaviorSubject<number>(0);
  }

  get image(): Observable<cornerstone.Image | null> {
    return this._imageSubject.asObservable();
  }

  get progress(): Observable<number> {
    return this._progress;
  }

  get index(): Observable<number> {
    return this._indexSubject.asObservable();
  }

  length = (): number => {
    return this._images?.length || 0;
  };

  getIndex = (): number => {
    return this._indexSubject.getValue();
  };

  goto = (value: number) => {
    if (!this._images) return;
    const index: number = Math.max(0, Math.min(this._images.length - 1, value));
    this._imageSubject.next(this._images[index]);
    this._indexSubject.next(index);
  };

  next = (delta: number = 1) => {
    if (!this._images) return;
    const index: number = Math.min(
      this._images.length - 1,
      this._indexSubject.getValue() + delta,
    );
    this._imageSubject.next(this._images[index]);
    this._indexSubject.next(index);
  };

  prev = (delta: number = 1) => {
    if (!this._images) return;
    const index: number = Math.max(0, this._indexSubject.getValue() - delta);
    this._imageSubject.next(this._images[index]);
    this._indexSubject.next(index);
  };

  destroy = () => {
    this._imagesSubscription.unsubscribe();
    this._imageSubject.unsubscribe();
    this._indexSubject.unsubscribe();
  };
}
