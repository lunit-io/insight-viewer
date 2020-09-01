import { Contour } from '@lunit/insight-viewer';

export const significants = ['significant', 'non-significant'] as const;
export const lesions = [
  'none',
  'cancer',
  'active-tbc',
  'pneumonia',
  'other',
] as const;

export type Significant = typeof significants[number];
export type Lesion = typeof lesions[number];

export const SignificantLabels = {
  significant: 'Clinically Significant',
  'non-significant': 'Clinically Non-Significant',
} as const;

export const LesionLabels = {
  none: 'None',
  cancer: 'Cancer',
  'active-tbc': 'Active-Tbc',
  pneumonia: 'Pneumonia',
  other: 'Other',
};

export interface AnnotationInfo {
  confidenceLevel: number; // 0 ~ 1
  significant: Significant;
  lesion: Lesion;
}

export interface Annotation extends AnnotationInfo, Contour {}
