import { isComplexPolygon } from '@lunit/is-complex-polygon';
import { isPolygonAreaGreaterThanArea } from '@lunit/is-polygon-area-greater-than-area';
import { RefObject, useCallback, useState } from 'react';
import { Contour, Point } from '../types';

export interface ContourDrawingState {
  contours: Contour[];
  focusedContour: Contour | null;
  addContour: (polygon: Point[], confidenceLevel: number, label?: ((contour: Contour) => string) | string, attrs?: {[attr: string]: string}) => Contour | null;
  addContours: (contours: Omit<Contour, 'id'>[]) => void;
  focusContour: (contour: Contour | null) => void;
  updateContour: (contour: Contour, patch: Partial<Contour>) => void;
  removeContour: (contour: Contour) => void;
  removeAllContours: () => void;
}

// <UserContourDrawer>, <UserContourViewer>를 사용하기 위한 helper
export function useUserContour({nextId, initialContours}: {nextId?: number | RefObject<number>, initialContours?: Omit<Contour, 'id'>[]} = {}): ContourDrawingState {
  // 사용자가 그린 contour list
  const [contours, setContours] = useState<Contour[]>(() => {
    if (initialContours) {
      const startId: number = typeof nextId === 'number'
        ? nextId
        : nextId && typeof nextId.current === 'number'
          ? nextId.current
          : 1;
      
      return initialContours.map((addedContour, i) => {
        return {
          ...addedContour,
          id: startId + i,
        };
      });
    }
    return [];
  });
  // mouse hover에 의해서 focus된 contour
  const [focusedContour, setFocusedContour] = useState<Contour | null>(null);
  
  const addContour = useCallback((polygon: Point[], confidenceLevel: number, label?: ((contour: Contour) => string) | string, dataAttrs?: {[attr: string]: string}): Contour | null => {
    if (!isPolygonAreaGreaterThanArea(polygon) || isComplexPolygon(polygon)) return null;
    
    if (dataAttrs) {
      validateDataAttrs(dataAttrs);
    }
    
    const contour: Contour = {
      id: typeof nextId === 'number'
        ? nextId
        : nextId && typeof nextId.current === 'number'
          ? nextId.current
          : Math.max(...contours.map(({id}) => id), 0) + 1,
      polygon,
      confidenceLevel,
      label,
      dataAttrs,
    };
    
    setContours(prevContours => {
      return [
        ...prevContours,
        contour,
      ];
    });
    
    return contour;
  }, [contours, nextId]);
  
  const addContours = useCallback((added: Omit<Contour, 'id'>[]) => {
    for (const contour of added) {
      if (contour.dataAttrs) {
        validateDataAttrs(contour.dataAttrs);
      }
    }
    
    const startId: number = typeof nextId === 'number'
      ? nextId
      : nextId && typeof nextId.current === 'number'
        ? nextId.current
        : Math.max(...contours.map(({id}) => id), 0) + 1;
    
    setContours(prevContours => {
      return [
        ...prevContours,
        ...added.map((addedContour, i) => {
          return {
            ...addedContour,
            id: startId + i,
          };
        }),
      ];
    });
  }, [contours, nextId]);
  
  const updateContour = useCallback((contour: Contour, patch: Partial<Omit<Contour, 'id'>>) => {
    if (patch.polygon && (!isPolygonAreaGreaterThanArea(patch.polygon) || isComplexPolygon(patch.polygon))) return;
    
    if (patch.dataAttrs) {
      validateDataAttrs(patch.dataAttrs);
    }
    
    const nextContour: Contour = {
      ...contour,
      ...patch,
      id: contour.id,
    };
    
    setContours(prevContours => {
      const nextContours = [...prevContours];
      const index: number = nextContours.findIndex(({id}) => nextContour.id === id);
      
      if (index > -1) {
        nextContours[index] = nextContour;
        
        setFocusedContour(prevFocusedContour => {
          return contour === prevFocusedContour
            ? nextContour
            : prevFocusedContour;
        });
      }
      
      return nextContours;
    });
    
    return nextContour;
  }, []);
  
  const focusContour = useCallback((contour: Contour | null) => {
    if (contour !== focusedContour) {
      setFocusedContour(contour);
    }
  }, [focusedContour]);
  
  const removeAllContours = useCallback(() => {
    setContours([]);
    setFocusedContour(null);
  }, []);
  
  const removeContour = useCallback((contour: Contour) => {
    setContours(prevContours => {
      const index = prevContours.findIndex(({id}) => id === contour.id);
      
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

function validateDataAttrs(dataAttrs?: {[attr: string]: string}) {
  if (!dataAttrs) return;
  
  Object.keys(dataAttrs).forEach(attr => {
    if (!/^data-/.test(attr)) {
      throw new Error(`Contour.dataAttrs 속성은 data-* 형태의 이름으로 입력되어야 합니다 (${attr})`);
    }
  });
}