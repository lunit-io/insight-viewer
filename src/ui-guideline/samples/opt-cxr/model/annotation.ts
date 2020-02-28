import { Contour } from '@lunit/insight-viewer';

export interface AnnotationInfo {
  confidenceLevel: number; // 0 ~ 1
}

export interface Annotation extends AnnotationInfo, Contour {}
