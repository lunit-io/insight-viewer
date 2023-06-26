# insight-viewer

Insight Viewer is a library that [Cornerstone.js](https://github.com/cornerstonejs/cornerstone) medical image viewer component for React.

- **Dicom Viewer**: Allows you to represent dicom image files in React.

- **Dicom Viewport handling**: You can control the Dicom viewport declaratively.

- **Drawing Annotation**: Supports the ability to draw annotations on Dicom images. <br />
  This allows you to visually represent the location of a lesion.

## Installation

The insight viewer library is registered on NPM, so you can install and use it.

- [@lunit/insight-viewer NPM](https://www.npmjs.com/package/@lunit/insight-viewer)

## Getting started with INSIGHT Viewer

Here is an examples of **Dicom Viewer**, **Interaction**, **Annotation Drawing**

### Dicom Viewer

If your purpose is to show a Dicom Image, you can use it as shown below.

```tsx
import InsightViewer, { useImage } from '@lunit/insight-viewer'

const MOCK_IMAGE = 'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000002.dcm'

export default function App() {
  const { image } = useImage({ wadouri: MOCK_IMAGE })

  return <InsightViewer image={image} />
}
```

### Interaction

If you want to manipulate the pan and adjustment of a Dicom Image through mouse events, you can use it as shown below.

```tsx
import { useRef } from 'react'
import InsightViewer, { useImage, useInteraction } from '@lunit/insight-viewer'
import { useViewport } from '@lunit/insight-viewer/viewport'

type Controllers = {
  pan: () => void
  reset: () => void
  adjust: () => void
}

const MOCK_IMAGE = 'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000002.dcm'

export default function App() {
  const viewerRef = useRef<HTMLDivElement | null>(null)
  const { image } = useImage({ wadouri: MOCK_IMAGE })
  const { interaction, setInteraction } = useInteraction({
    mouseWheel: 'scale', // Dicom Image scale is changed by mouse wheel events.
    primaryDrag: 'pan', // The Dicom Image is moved by the left mouse drag.
  })
  const { viewport, setViewport, resetViewport } = useViewport({ image, viewerRef })

  const controllers: Controllers = {
    pan: () => {
      setInteraction((prev) => ({ ...prev, primaryDrag: 'pan' }))
    },
    reset: resetViewport, // Set to the initial viewport of the Dicom Image.
    adjust: () => {
      setInteraction((prev) => ({ ...prev, primaryDrag: 'adjust' }))
    },
  }

  const viewerProps = {
    image,
    viewerRef,
    viewport,
    interaction,
    onViewportChange: setViewport,
  }

  return (
    <>
      <button style={{ marginRight: '8px' }} onClick={controllers['pan']}>
        pan
      </button>
      <button style={{ marginRight: '8px' }} onClick={controllers['adjust']}>
        adjust
      </button>
      <button onClick={controllers['reset']}>reset</button>
      <InsightViewer {...viewerProps} />
    </>
  )
}
```

### Annotation Drawing

If you want to draw annotations such as polygon, ruler, and area on a Dicom image, you can use the code below.

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

## Docs

You can see what features are supported and example code to use them.

- [https://insight-viewer.lunit.io/](https://insight-viewer.lunit.io/)

## Project structure

- [`libs`](./libs) - Importable libraries.
- [`apps`](./apps) - Applications that use libraries

### Packages

You can check out the library code deployed on NPM.

- [`libs/insight-viewer`](./libs/insight-viewer) - Cornerstone.js medical image viewer component for React.

### Testing Docs

You can view documents created with the INSIGHT Viewer library.

- [`apps/insight-viewer-dev`](./apps/insight-viewer-dev) - Documentation site for @lunit/insight-viewer.

## Development

Clone this repository locally `$ git clone git@github.com:lunit-io/insight-viewer.git`

```sh
$ npm i
$ npm install -g nx
$ npm start // serve docs on http://localhost:4200
```
