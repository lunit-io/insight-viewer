import { Annotation } from './case';

export interface Lesion {
  id: string;
  label: string;
}

export type OfLesion<T> = { [lesionId: string]: T };

export const createLesionCategorizedValues = <T>(lesions: Lesion[]) => (
  initialValue: () => T,
): OfLesion<T> => {
  return lesions.reduce((map, { id }) => {
    map[id] = initialValue();
    return map;
  }, {});
};

export const categorizeAnnotations = (lesions: Lesion[]) => (
  contours: Annotation[],
): OfLesion<Annotation[]> => {
  const categorized: OfLesion<Annotation[]> = createLesionCategorizedValues<
    Annotation[]
  >(lesions)(() => []);

  for (const contour of contours) {
    if (contour.lesion) {
      categorized[contour.lesion.id].push(contour);
    }
  }

  return categorized;
};
