import { CircularProgress } from '@material-ui/core';
import React, {
  Context,
  createContext,
  CSSProperties,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import styled from 'styled-components';
import { useImageProgress } from '../hooks/useImageProgress';
import { CornerstoneImage } from '../image/types';

export interface ProgressViewerProps {
  width: number;
  height: number;
  inProgress?: boolean;
  image?: CornerstoneImage | null | undefined;
}

let count: number = 0;

export function ProgressViewer({ width, height, inProgress, image }: ProgressViewerProps) {
  const id: number = useMemo(() => ++count, []);
  const imageProgress = useImageProgress(image);
  const { setProgress, unsetProgress } = useProgressCollection();

  useEffect(() => {
    if (inProgress === true || typeof imageProgress === 'number') {
      setProgress(id, imageProgress || 0);
    } else {
      unsetProgress(id);
    }
  }, [id, imageProgress, inProgress, setProgress, unsetProgress]);

  return (
    <>
      {(inProgress === true || typeof imageProgress === 'number') && (
        <Div
          style={{
            width,
            height,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          }}
        >
          <CircularProgress size={120} />
        </Div>
      )}
      {typeof imageProgress === 'number' && (
        <Div
          style={{
            width,
            height,
          }}
        >
          <CircularProgress size={100} variant="static" value={imageProgress * 100} />
        </Div>
      )}
    </>
  );
}

interface ProgressCollectorProps {
  children: ReactNode;
}

interface ProgressCollection {
  inProgress: boolean;
  setProgress: (id: number, progress: number) => void;
  unsetProgress: (id: number) => void;
}

const ProgressCollectionContext: Context<ProgressCollection> = createContext<ProgressCollection>({
  inProgress: false,

  setProgress: () => {
    // DO NOTHING
  },
  unsetProgress: () => {
    // DO NOTHING
  },
});

export function ProgressCollector({ children }: ProgressCollectorProps) {
  const [collection, setCollection] = useState<Map<number, number>>(() => new Map());

  const setProgress = useCallback(
    (id: number, progress: number) => {
      setCollection(prevCollection => {
        const nextCollection: Map<number, number> = new Map(prevCollection);
        nextCollection.set(id, progress);
        return nextCollection;
      });
    },
    [setCollection],
  );

  const unsetProgress = useCallback(
    (id: number) => {
      setCollection(prevCollection => {
        if (prevCollection.has(id)) {
          const nextCollection: Map<number, number> = new Map(prevCollection);
          nextCollection.delete(id);
          return nextCollection;
        }
        return prevCollection;
      });
    },
    [setCollection],
  );

  const inProgress: boolean = useMemo(() => {
    return collection.size > 0;
  }, [collection]);

  const state: ProgressCollection = useMemo<ProgressCollection>(() => {
    return {
      inProgress,
      setProgress,
      unsetProgress,
    };
  }, [inProgress, setProgress, unsetProgress]);

  return <ProgressCollectionContext.Provider value={state}>{children}</ProgressCollectionContext.Provider>;
}

function useProgressCollection(): ProgressCollection {
  return useContext(ProgressCollectionContext);
}

export function useProgressViewersActivity(): boolean {
  return useContext(ProgressCollectionContext).inProgress;
}

export function useContainerStyleOfProgressViewersInactivity(
  style: CSSProperties = { pointerEvents: 'none' },
): CSSProperties {
  const { inProgress } = useContext(ProgressCollectionContext);
  return inProgress ? style : {};
}

const Div = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
