import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ParallelImageLoader } from './ParallelImageLoader';
import { CornerstoneImage, ImageLoader } from './types';

interface Options {
  unload?: (imageId: string) => void;
  loader?: ImageLoader;
}

const defaultLoader: ImageLoader = new ParallelImageLoader();

export class CornerstoneFileSingleImage implements CornerstoneImage {
  private readonly _imageSubject: BehaviorSubject<cornerstone.Image | null>;
  private readonly _imageId: string;
  private readonly _loader: ImageLoader;
  private _destoyed: boolean = false;

  constructor(private file: File, private readonly options: Options = {}) {
    this._imageSubject = new BehaviorSubject<cornerstone.Image | null>(null);
    this._loader = options.loader || defaultLoader;

    this._imageId = cornerstoneWADOImageLoader.wadouri.fileManager.add(file);

    this.loadImage();
  }

  get image(): Observable<cornerstone.Image | null> {
    return this._imageSubject.asObservable();
  }

  get progress(): Observable<number> {
    return this._imageSubject.pipe(map((image) => (image ? 1 : 0)));
  }

  destroy = () => {
    if (this.options && typeof this.options.unload === 'function') {
      this.options.unload(this._imageId);
    }

    this._destoyed = true;
  };

  private loadImage = async () => {
    try {
      const image = await this._loader.loadImage({
        imageId: this._imageId,
      });

      if (!this._destoyed) {
        this._imageSubject.next(image);
      }
    } catch (error) {
      if (!this._destoyed) {
        console.error(`loadImage(${this._imageId}) failed:`, error);
      }
    }
  };
}
