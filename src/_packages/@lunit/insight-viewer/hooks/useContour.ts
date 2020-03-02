import { isComplexPolygon } from '@lunit/is-complex-polygon';
import { isPolygonAreaGreaterThanArea } from '@lunit/is-polygon-area-greater-than-area';
import { RefObject, useCallback, useState } from 'react';
import { Contour, Point } from '../types';

export interface ContourDrawingState<T extends Contour> {
  contours: T[];
  focusedContour: T | null;
  addContour: (polygon: Point[], contourInfo?: Omit<T, 'id' | 'polygon'>) => T | null;
  addContours: (contours: Omit<T, 'id'>[]) => void;
  focusContour: (contour: T | null) => void;
  updateContour: (contour: T, patch: Partial<T>) => void;
  removeContour: (contour: T) => void;
  removeAllContours: () => void;
}

export function useContour<T extends Contour>({
  nextId,
  initialContours,
  mode = 'contour',
}: {
  nextId?: number | RefObject<number>;
  initialContours?: Omit<T, 'id'>[];
  mode?: 'contour' | 'point' | 'circle';
} = {}): ContourDrawingState<T> {
  const [contours, setContours] = useState<T[]>(() => {
    if (initialContours) {
      const startId: number =
        typeof nextId === 'number' ? nextId : nextId && typeof nextId.current === 'number' ? nextId.current : 1;

      return initialContours.map<T>((addedContour, i) => {
        return {
          ...addedContour,
          id: startId + i,
        } as T;
      });
    }
    return [];
  });

  const [focusedContour, setFocusedContour] = useState<T | null>(null);

  const addContour = useCallback(
    (polygon: Point[], contourInfo: Partial<Omit<T, 'id' | 'polygon'>> = {}): T | null => {
      if (mode === 'contour' && (!isPolygonAreaGreaterThanArea(polygon) || isComplexPolygon(polygon))) return null;

      const { dataAttrs } = contourInfo;

      if (dataAttrs) {
        validateDataAttrs(dataAttrs);
      }

      let contour: T | null = null;

      setContours(prevContours => {
        contour = {
          ...contourInfo,
          id:
            typeof nextId === 'number'
              ? nextId
              : nextId && typeof nextId.current === 'number'
              ? nextId.current
              : Math.max(...prevContours.map(({ id }) => id), 0) + 1,
          polygon,
          dataAttrs,
        } as T;

        return [...prevContours, contour];
      });

      return contour;
    },
    [nextId, mode],
  );

  const addContours = useCallback(
    (added: Omit<T, 'id'>[]) => {
      for (const contour of added) {
        if (contour.dataAttrs) {
          validateDataAttrs(contour.dataAttrs);
        }
      }

      setContours(prevContours => {
        const startId: number =
          typeof nextId === 'number'
            ? nextId
            : nextId && typeof nextId.current === 'number'
            ? nextId.current
            : Math.max(...prevContours.map(({ id }) => id), 0) + 1;

        return [
          ...prevContours,
          ...added.map((addedContour, i) => {
            return {
              ...addedContour,
              id: startId + i,
            } as T;
          }),
        ];
      });
    },
    [nextId],
  );

  const updateContour = useCallback(
    (contour: T, patch: Partial<Omit<T, 'id'>>) => {
      if (
        patch.polygon &&
        mode === 'contour' &&
        (!isPolygonAreaGreaterThanArea(patch.polygon) || isComplexPolygon(patch.polygon))
      )
        return;

      if (patch.dataAttrs) {
        validateDataAttrs(patch.dataAttrs);
      }

      const nextContour: T = {
        ...contour,
        ...patch,
        id: contour.id,
      };

      setContours(prevContours => {
        const nextContours = [...prevContours];
        const index: number = nextContours.findIndex(({ id }) => nextContour.id === id);

        if (index > -1) {
          nextContours[index] = nextContour;

          setFocusedContour(prevFocusedContour => {
            return contour === prevFocusedContour ? nextContour : prevFocusedContour;
          });
        }

        return nextContours;
      });

      return nextContour;
    },
    [mode],
  );

  const focusContour = useCallback((contour: T | null) => {
    setFocusedContour(prevFocusedContour => {
      return contour !== prevFocusedContour ? contour : prevFocusedContour;
    });
  }, []);

  const removeAllContours = useCallback(() => {
    setContours([]);
    setFocusedContour(null);
  }, []);

  const removeContour = useCallback((contour: T) => {
    setContours(prevContours => {
      const index = prevContours.findIndex(({ id }) => id === contour.id);

      if (index > -1) {
        const nextContours = [...prevContours];
        nextContours.splice(index, 1);
        return nextContours;
      }

      return prevContours;
    });
    setFocusedContour(null);
  }, []);

  return {
    contours,
    addContour,
    addContours,
    updateContour,
    removeContour,
    removeAllContours,
    focusContour,
    focusedContour,
  };
}

function validateDataAttrs(dataAttrs?: { [attr: string]: string }) {
  if (!dataAttrs) return;

  Object.keys(dataAttrs).forEach(attr => {
    if (!/^data-/.test(attr)) {
      throw new Error(`Contour.dataAttrs 속성은 data-* 형태의 이름으로 입력되어야 합니다 (${attr})`);
    }
  });
}

/** @deprecated use useContour() */
export const useUserContour = useContour;
