import React, {
  Consumer,
  Context,
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { CornerstoneSingleImage } from '../image/CornerstoneSingleImage';
import { CornerstoneImage } from '../image/types';

export interface ImageStoreProviderProps {
  children: ReactNode;
  cacheImages?: number;
  factory?: (imageId: string) => CornerstoneImage;
}

export interface ImageStoreState {
  fetch: (imageId: string) => CornerstoneImage;
  purge: (imageId: string) => void;
}

// @ts-ignore
const ImageStoreContext: Context<ImageStoreState> = createContext<ImageStoreState>();

function defaultFactory(imageId: string): CornerstoneImage {
  return new CornerstoneSingleImage(imageId);
}

export function ImageStoreProvider({cacheImages = 10, factory = defaultFactory, children}: ImageStoreProviderProps) {
  const [cache] = useState<[string, CornerstoneImage][]>(() => []);
  
  const fetch = useCallback((imageId: string) => {
    let item = cache.find(([itemImageId]) => itemImageId === imageId);
    
    if (!item) {
      item = [imageId, factory(imageId)];
      cache.push(item);
      
      if (cache.length > cacheImages) {
        const deleteCount: number = cache.length - cacheImages;
        const deleteItems = cache.splice(0, deleteCount);
        
        for (const deleteItem of deleteItems) {
          deleteItem[1].destroy();
        }
      }
    }
    
    return item[1];
  }, [cache, cacheImages, factory]);
  
  const purge = useCallback((imageId: string) => {
    const index = cache.findIndex(([itemImageId]) => itemImageId === imageId);
    
    if (index > -1) {
      const deleteItems = cache.splice(index, 1);
      
      for (const deleteItem of deleteItems) {
        deleteItem[1].destroy();
      }
    }
  }, [cache]);
  
  useEffect(() => {
    return () => {
      for (const deleteItem of cache) {
        deleteItem[1].destroy();
      }
    };
  }, [cache]);
  
  return (
    <ImageStoreContext.Provider value={{fetch, purge}}>
      {children}
    </ImageStoreContext.Provider>
  );
}

export function useImageStore(): ImageStoreState {
  return useContext(ImageStoreContext);
}

export const ImageStoreConsumer: Consumer<ImageStoreState> = ImageStoreContext.Consumer;