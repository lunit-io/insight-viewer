import { isComplexPolygon } from '@lunit/is-complex-polygon';
import { isPolygonAreaGreaterThanArea } from '@lunit/is-polygon-area-greater-than-area';
import { RefObject, useCallback, useState } from 'react';
import { Contour, Point } from '../types';

export interface ContourDrawingState {
  contours: Contour[];
  focusedContour: Contour | null;
  addContour: (polygon: Point[], confidenceLevel: number) => Contour | null;
  focusContour: (contour: Contour | null) => void;
  updateContour: (contour: Contour, patch: Partial<Contour>) => void;
  removeContour: (contour: Contour) => void;
  removeAllContours: () => void;
}

// <UserContourDrawer>, <UserContourViewer>를 사용하기 위한 helper
export function useUserContour({nextId}: {nextId?: number | RefObject<number>} = {}): ContourDrawingState {
  // 사용자가 그린 contour list
  const [contours, setContours] = useState<Contour[]>([]);
  // mouse hover에 의해서 focus된 contour
  const [focusedContour, setFocusedContour] = useState<Contour | null>(null);
  
  const addContour = useCallback((polygon: Point[], confidenceLevel: number): Contour | null => {
    if (!isPolygonAreaGreaterThanArea(polygon) || isComplexPolygon(polygon)) return null;
    
    const contour: Contour = {
      id: typeof nextId === 'number'
        ? nextId
        : nextId && typeof nextId.current === 'number'
          ? nextId.current
          : Math.max(...contours.map(({id}) => id), 0) + 1,
      polygon,
      confidenceLevel,
    };
    
    setContours(prevContours => {
      return [
        ...prevContours,
        contour,
      ];
    });
    
    return contour;
  }, [contours, nextId]);
  
  const updateContour = useCallback((contour: Contour, patch: Partial<Omit<Contour, 'id'>>) => {
    if (patch.polygon && (!isPolygonAreaGreaterThanArea(patch.polygon) || isComplexPolygon(patch.polygon))) return;
    
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
    updateContour,
    removeContour,
    removeAllContours,
    focusContour,
    focusedContour,
  };
}