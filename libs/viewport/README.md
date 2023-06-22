# viewport

Manages the function, type, that handles the viewport of the Dicom Image.

## How to use

You can get the viewport information of an image via useViewport.

```tsx
import { useRef } from 'react'
import InsightViewer, { useImage } from '@lunit/insight-viewer'
import { useViewport } from '@lunit/insight-viewer/viewport'

const MOCK_IMAGE = 'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000002.dcm'

export default function App() {
  const viewerRef = useRef<HTMLDivElement | null>(null)
  const { image } = useImage({ wadouri: MOCK_IMAGE })
  const { viewport } = useViewport({ image, viewerRef })

  console.log(viewport)

  const viewerProps = {
    image,
    viewerRef,
    viewport,
  }

  return <InsightViewer {...viewerProps} />
}
```

you can getting a viewport information

```js
{
  hflip: false
  invert: false
  rotation: 0
  scale: 2.109375
  vflip: false
  windowCenter: 32
  windowWidth: 90
  x: 0
  y: 0
  _viewportOptions: fitScale: true
}
```
