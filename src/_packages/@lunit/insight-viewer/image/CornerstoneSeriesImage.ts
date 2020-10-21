import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ParallelImageLoader } from './ParallelImageLoader';
import { CornerstoneSequenceImage, getProgressEventDetail, ImageLoader, ProgressEventDetail } from './types';
import { wadoImageLoaderXHRLoader } from './wadoImageLoaderXHRLoader';

function isImage(image: cornerstone.Image | null): image is cornerstone.Image {
  return image !== null;
}

interface Options {
  unload?: (imageIds: string[]) => void;
  initialIndex?: number;
  cancelTokenName?: string;
  timeout?: number;
  loader?: ImageLoader;
}

const defaultLoader: ImageLoader = new ParallelImageLoader();

export class CornerstoneSeriesImage implements CornerstoneSequenceImage {
  private readonly _images: (cornerstone.Image | null)[];
  private readonly _imageSubject: BehaviorSubject<cornerstone.Image | null>;
  private readonly _progressSubject: BehaviorSubject<number[]>;
  private readonly _indexSubject: BehaviorSubject<number>;
  private readonly _cancel: (() => void)[] = [];
  private readonly _loader: ImageLoader;
  private _destoyed: boolean = false;

  constructor(private readonly imageIds: string[], private readonly options: Options = {}) {
    this._images = imageIds.map(() => null);

    const { initialIndex = 0 } = options;

    this._imageSubject = new BehaviorSubject<cornerstone.Image | null>(null);
    this._indexSubject = new BehaviorSubject<number>(initialIndex);
    this._progressSubject = new BehaviorSubject(imageIds.map(() => 0));
    this._loader = options.loader || defaultLoader;

    cornerstone.events.addEventListener('cornerstoneimageloadprogress', this.onProgress);

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

  get image(): Observable<cornerstone.Image | null> {
    return this._imageSubject.asObservable();
  }

  get progress(): Observable<number> {
    return this._progressSubject.pipe<number>(
      map<number[], number>((progress) => progress.reduce((t, x) => t + x, 0) / progress.length),
    );
  }

  get index(): Observable<number> {
    return this._indexSubject.asObservable();
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

    cornerstone.events.removeEventListener('cornerstoneimageloadprogress', this.onProgress);

    this._cancel.forEach((cancel) => cancel());

    this._destoyed = true;
  };

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

    const before: cornerstone.Image[] = this._images
      .slice(0, index - 1)
      .filter<cornerstone.Image>(isImage)
      .reverse();

    if (before.length > 0) {
      this._imageSubject.next(before[0]);
      return;
    }

    const after: cornerstone.Image[] = this._images.slice(index + 1).filter<cornerstone.Image>(isImage);

    if (after.length > 0) {
      this._imageSubject.next(after[0]);
      return;
    }

    console.warn('대체할 Image를 찾을 수 없음');
  };

  private loadImage = async (imageId: string, index: number) => {
    try {
      this._images[index] = await this._loader.loadImage({
        imageId: imageId,
        options: { loader: wadoImageLoaderXHRLoader((cancel) => this._cancel.push(cancel)) },
      });

      const nextProgress: number[] = [...this._progressSubject.getValue()];
      nextProgress[index] = 1;

      const total: number = nextProgress.reduce((t, n) => t + n, 0);
      if (total >= 1) {
        cornerstone.events.removeEventListener('cornerstoneimageloadprogress', this.onProgress);
      }

      if (!this._destoyed) {
        this._progressSubject.next(nextProgress);
      }
    } catch (error) {
      if (!this._destoyed) {
        console.error(`loadImage(${imageId}) failed:`, error);
      }
    }
  };
}
