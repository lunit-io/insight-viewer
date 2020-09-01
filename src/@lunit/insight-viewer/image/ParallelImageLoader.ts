import { ImageLoader, LoadImageParams } from './types';

async function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

interface Options {
  timeout?: number;
}

export class ParallelImageLoader implements ImageLoader {
  constructor(private readonly options: Options = {}) {}

  loadImage = ({
    imageId,
    options,
  }: LoadImageParams): Promise<cornerstone.Image> => {
    return typeof this.options.timeout === 'number'
      ? Promise.race([
          cornerstone.loadImage(imageId, options),
          delay(this.options.timeout).then(() => {
            throw new Error('TIMEOUT');
          }),
        ])
      : cornerstone.loadImage(imageId, options);
  };
}
