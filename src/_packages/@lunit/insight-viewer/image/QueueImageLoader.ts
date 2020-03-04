import { ImageLoader, LoadImageParams } from './types';

interface Options {
  timeout?: number;
}

interface Item {
  imageId: string;
  options?: object;
  resolve: (image: cornerstone.Image) => void;
  reject: (error: Error) => void;
}

async function delay(ms: number) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

export class QueueImageLoader implements ImageLoader {
  private queue: Item[] = [];
  private inProcess: boolean = false;

  constructor(private readonly options: Options = {}) {}

  loadImage = ({ imageId, options }: LoadImageParams): Promise<cornerstone.Image> => {
    return new Promise<cornerstone.Image>((resolve, reject) => {
      this.add({ imageId, options, resolve, reject });
    });
  };

  private add = (item: Item) => {
    this.queue.push(item);

    if (!this.inProcess) {
      this.run();
    }
  };

  private run = () => {
    if (this.queue.length === 0) return;

    const item: Item | undefined = this.queue.shift();

    if (!item) return;

    this.inProcess = true;

    const promise =
      typeof this.options.timeout === 'number'
        ? Promise.race([
            cornerstone.loadImage(item.imageId, item.options),
            delay(this.options.timeout).then(() => {
              throw new Error('TIMEOUT');
            }),
          ])
        : cornerstone.loadImage(item.imageId, item.options);

    promise
      .then(item.resolve)
      .catch(item.reject)
      .finally(() => {
        this.inProcess = false;
        this.run();
      });
  };
}
