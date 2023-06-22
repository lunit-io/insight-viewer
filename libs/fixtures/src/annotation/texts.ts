import { TextAnnotation } from '@lunit/insight-viewer/annotation'

export const TEXT_ANNOTATIONS: TextAnnotation[] = [
  {
    id: 1,
    type: 'text',
    points: [
      [150, 133.8125],
      [450, 222.8125],
    ],
    label: 'text 1',
  },
  {
    id: 2,
    type: 'text',
    points: [
      [200, 603.8125],
      [300, 826.8125],
    ],
    label: 'text\nwith\n\nnew line',
  },
]
