# annotation

Manages the core logic related to annotations.<br />
It is responsible for drawing, editing, and managing the state of an annotation.

## How to use

Annotation Viewer, for drawing purposes, with each annotation reflecting the Dicom Image coordinate system.<br />
The example code below allows you to draw polygon, ruler, and area annotations.

```tsx
import { useState } from 'react'
import InsightViewer, { useImage } from '@lunit/insight-viewer'
import { AnnotationOverlay } from '@lunit/insight-viewer/annotation'

import type { Annotation, AnnotationMode } from '@lunit/insight-viewer/annotation'

const MOCK_IMAGE = 'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000002.dcm'

export default function App() {
  const [annotationMode, setAnnotationMode] = useState<AnnotationMode>('polygon')
  const [annotations, setAnnotation] = useState<Annotation[]>([])
  const { image } = useImage({ wadouri: MOCK_IMAGE })

  return (
    <>
      <button style={{ marginRight: '8px' }} onClick={() => setAnnotationMode('polygon')}>
        polygon
      </button>
      <button style={{ marginRight: '8px' }} onClick={() => setAnnotationMode('ruler')}>
        ruler
      </button>
      <button onClick={() => setAnnotationMode('area')}>area</button>
      <InsightViewer image={image}>
        <AnnotationOverlay
          isDrawing
          mode={annotationMode}
          annotations={annotations}
          onChange={(annotations) => setAnnotation(annotations)}
        />
      </InsightViewer>
    </>
  )
}
```
