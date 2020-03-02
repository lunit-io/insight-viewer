import { Contour } from '@lunit/insight-viewer';
import { Lesion } from './lesion';

export type CaseDeclare = 'none' | 'skip';

export interface CXRAnnotationCaseStatus {
  // from data store
  caseDeclare: CaseDeclare;
}

export interface AnnotationInfo {
  lesion: Lesion | null;
}

export interface Annotation extends Contour, AnnotationInfo {}

export interface AIAnnotation extends Contour, AnnotationInfo {}

export interface AnnotatorAnnotation extends Contour, AnnotationInfo {
  user: string;
}
