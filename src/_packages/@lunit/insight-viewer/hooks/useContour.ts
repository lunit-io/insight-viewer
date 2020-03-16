import { isComplexPolygon } from '@lunit/is-complex-polygon';
import { isPolygonAreaGreaterThanArea } from '@lunit/is-polygon-area-greater-than-area';
import { RefObject, useCallback, useState } from 'react';
import { Contour, Point } from '../types';

export interface UseContourParams<T extends Contour> {
  /**
   * 다음 contour id를 결정하는데 사용될 수 있다.
   * MMG와 같이 여러개의 useContour()가 동시에 사용되는 경우 nextId를 일치 시키기 위해 사용된다.
   */
  nextId?: number | RefObject<number>;

  /**
   * 초기화 데이터
   */
  initialContours?: Omit<T, 'id'>[];

  /**
   * Contour Mode
   * Contour Validation에 영향을 준다. (e.g. polygon 최소 면적 판단)
   */
  mode?: 'contour' | 'point' | 'circle';
}

export interface ContourDrawingState<T extends Contour> {
  /** 현재 Contours */
  contours: T[];

  /** User Interaction 등으로 인해서 Focus 된 Contour */
  focusedContour: T | null;

  /** 새로운 Contour를 만들어준다 */
  addContour: (polygon: Point[], contourInfo?: Omit<T, 'id' | 'polygon'>) => T | null;

  /** 여러개의 Contour들을 일괄 추가한다. */
  addContours: (contours: Omit<T, 'id'>[]) => void;

  /** 특정 Contour를 Focus 하거나, Focus 된 Contour를 제거한다 */
  focusContour: (contour: T | null) => void;

  /** 특정 Contour의 정보를 Update 한다 */
  updateContour: (contour: T, patch: Partial<T>) => void;

  /** 특정 Contour를 삭제한다 */
  removeContour: (contour: T) => void;

  /** 모든 Contour들을 삭제한다 */
  removeAllContours: () => void;

  /** Contour 데이터를 초기화한다 */
  reset: (config?: { initialContours?: Omit<T, 'id'>[] }) => void;
}

export function useContour<T extends Contour>({
  nextId,
  initialContours,
  mode = 'contour',
}: UseContourParams<T> = {}): ContourDrawingState<T> {
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

  const reset = useCallback(
    ({ initialContours }: { initialContours?: Omit<T, 'id'>[] } = {}) => {
      setContours(() => {
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
    },
    [nextId],
  );

  return {
    contours,
    addContour,
    addContours,
    updateContour,
    removeContour,
    removeAllContours,
    focusContour,
    focusedContour,
    reset,
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
