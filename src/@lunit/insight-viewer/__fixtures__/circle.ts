import { Contour } from '@lunit/insight-viewer';

export function labelFunction(contour: Contour): string {
  return `Annotation(${contour.id})`;
}

export const initialContours: Omit<Contour, 'id'>[] = [
  {
    polygon: [
      [340.48, 232.95999999999998],
      [265.38666666666666, 232.10666666666668],
    ],
    label: labelFunction,
    dataAttrs: {
      'data-category': 'normal',
    },
  },
  {
    polygon: [
      [173.2266666666667, 381.44],
      [276.48, 400.21333333333337],
    ],
    label: labelFunction,
    dataAttrs: {
      'data-category': 'abnormal',
    },
  },
  {
    polygon: [
      [419.84000000000003, 448.85333333333335],
      [361.81333333333333, 407.04],
    ],
    label: labelFunction,
    dataAttrs: {
      'data-category': 'normal',
    },
  },
  {
    polygon: [
      [174.93333333333334, 88.74666666666668],
      [215.89333333333335, 129.70666666666665],
    ],
    label: labelFunction,
    dataAttrs: {
      'data-category': 'abnormal',
    },
  },
];
