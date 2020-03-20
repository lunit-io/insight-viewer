import { Observable, OperatorFunction, Subscription } from 'rxjs';
import { npy } from './npy';
import { NpyImageInfo } from './types';

export interface NpyCornerstoneImages {
  axial: cornerstone.Image[];
  coronal: cornerstone.Image[];
  sagittal: cornerstone.Image[];
}

export const mapNpyBufferToImages = ({
  id,
  windowCenter,
  windowWidth,
  sliceSpacing,
  rowPixelSpacing,
  columnPixelSpacing,
  slope = 1.0,
  intercept = 0.0,
  minPixelValue = -2048,
  maxPixelValue = 3096,
}: NpyImageInfo): OperatorFunction<ArrayBufferLike, NpyCornerstoneImages> => (
  observable: Observable<ArrayBufferLike>,
) =>
  new Observable<NpyCornerstoneImages>(observer => {
    const subscription: Subscription = observable.subscribe(
      buffer => {
        const {
          shape: [, slices, rows, columns],
          data,
        } = npy(buffer);

        const axialImages: cornerstone.Image[] = [];
        const coronalImages: cornerstone.Image[] = [];
        const sagittalImages: cornerstone.Image[] = [];

        const axialImageDataLength: number = columns * rows;
        for (let i = 0; i < slices; i++) {
          const axialImageData: Int16Array = new Int16Array(axialImageDataLength);
          for (let j = 0; j < axialImageDataLength; j++) {
            axialImageData[j] = data[i * axialImageDataLength + j];
          }
          axialImages.push({
            imageId: id + '_axial_' + i,
            minPixelValue,
            maxPixelValue,
            slope,
            intercept,
            //@ts-ignore
            windowCenter,
            //@ts-ignore
            windowWidth,
            getPixelData: () => axialImageData,
            rows: rows,
            columns,
            height: rows,
            width: columns,
            color: false,
            columnPixelSpacing,
            rowPixelSpacing,
            invert: false,
            sizeInBytes: columns * rows * Int16Array.BYTES_PER_ELEMENT,
            //@ts-ignore
            sliceSpacing,
          });
        }

        const coronalRows: number = slices;
        const coronalColumns: number = columns;
        for (let i = 0; i < rows; i++) {
          const coronalImageData: Int16Array = new Int16Array(coronalRows * coronalColumns);
          for (let x = 0; x < coronalColumns; x++) {
            for (let y = 0; y < coronalRows; y++) {
              // WARNING! row reversed
              coronalImageData[x + (coronalRows - y - 1) * coronalColumns] =
                data[x + y * axialImageDataLength + i * coronalColumns];
            }
          }
          coronalImages.push({
            imageId: id + '_coronal_' + i,
            minPixelValue,
            maxPixelValue,
            slope,
            intercept,
            //@ts-ignore
            windowCenter,
            //@ts-ignore
            windowWidth,
            getPixelData: () => coronalImageData,
            rows: coronalRows,
            columns: coronalColumns,
            height: coronalRows,
            width: coronalColumns,
            color: false,
            columnPixelSpacing: columnPixelSpacing,
            rowPixelSpacing: sliceSpacing,
            invert: false,
            sizeInBytes: coronalRows * coronalColumns * Int16Array.BYTES_PER_ELEMENT,
            //@ts-ignore
            sliceSpacing: rowPixelSpacing,
          });

          const sagittalRows = slices;
          const sagittalColumns = rows;
          const sagittalImageData = new Int16Array(sagittalRows * sagittalColumns);
          for (let x = 0; x < sagittalColumns; x++) {
            for (let y = 0; y < sagittalRows; y++) {
              // WARNING! row reversed
              sagittalImageData[x + (sagittalRows - y - 1) * sagittalColumns] =
                data[x * columns + y * axialImageDataLength + i];
            }
          }
          sagittalImages.push({
            imageId: id + '_sagittal_' + i,
            minPixelValue,
            maxPixelValue,
            slope,
            intercept,
            //@ts-ignore
            windowCenter,
            //@ts-ignore
            windowWidth,
            getPixelData: () => sagittalImageData,
            rows: sagittalRows,
            columns: sagittalColumns,
            height: sagittalRows,
            width: sagittalColumns,
            color: false,
            columnPixelSpacing: rowPixelSpacing,
            rowPixelSpacing: sliceSpacing,
            invert: false,
            sizeInBytes: sagittalRows * sagittalColumns * Int16Array.BYTES_PER_ELEMENT,
            //@ts-ignore
            sliceSpacing: columnPixelSpacing,
          });
        }

        observer.next({
          axial: axialImages,
          coronal: coronalImages,
          sagittal: sagittalImages,
        });

        return () => {
          subscription.unsubscribe();
        };
      },
      error => observer.error(error),
      () => observer.complete(),
    );
  });
