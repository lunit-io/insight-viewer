export const BASE_CODE = `\
import { useState, useRef } from 'react'
import InsightViewer, { useImage } from '@lunit/insight-viewer'
import { AnnotationOverlay } from '@lunit/insight-viewer/annotation'
import { IMAGES } from '@insight-viewer-library/fixtures'

import type { Annotation } from '@lunit/insight-viewer/annotation'

export default function Viewer() {
  const viewerRef = useRef<HTMLDivElement>(null)

  // if you want set initial annotations, set value to below state
  const [annotations, setAnnotations] = useState<Annotation[]>([])

  const { loadingState, image } = useImage({
    wadouri: IMAGES[0],
  })

  const handleAnnotationsChange = (annotations: Annotation[]) => {
    setAnnotations(annotations)
  }

  return (
    <div>
      <div style={{ width: '500px', height: '500px' }}>
        <InsightViewer image={image} viewerRef={viewerRef}>
          {loadingState === 'success' && (
            <AnnotationOverlay
              /**
               * if this value is false, you can't drawing annotation.
               * just only see the initial annotations.
               */
              isDrawing={true}
              mode="polygon"
              annotations={annotations}
              onChange={handleAnnotationsChange}
            />
          )}
        </InsightViewer>
      </div>
    </div>
  )
}

`
