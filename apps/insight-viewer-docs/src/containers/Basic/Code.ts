export const DICOM_CODE = `\
import InsightViewer, { useImage } from '@lunit/insight-viewer'

const style = {
  width: '500px',
  height: '500px'
}

export default function App() {
  const { loadingState, image } = useImage({
    wadouri: IMAGE_ID,
    onError,            // optional
    requestInterceptor, // optional
    timeout,            // optional, default is 60 * 1000
    /**
     * required if you want to support more transfer syntaxes
     * see: https://github.com/cornerstonejs/cornerstoneWADOImageLoader/issues/403
     */
    loaderOptions: {
      webWorkerManagerOptions: {
        webWorkerTaskPaths: [
          'http://localhost:3000/workers/610.bundle.min.worker.js',
          'http://localhost:3000/workers/888.bundle.min.worker.js',
        ],
        taskConfiguration: {
          decodeTask: {
            initializeCodecsOnStartup: false,
          },
        },
      },
    },
  })

  return (
    <div style={style}> // Wrapper size is required because InsightViewer's width/height is '100%'.
      <InsightViewer image={image} />
    </div>
  )
}
`
export const WEB_CODE = `\
import InsightViewer, { useImage } from '@lunit/insight-viewer'

const style = {
  width: '500px',
  height: '500px'
}

export default function App() {
  const { image } = useImage({
    web: IMAGE_ID,
    onError,            // optional
    requestInterceptor, // optional
    timeout,            // optional, default is 60 * 1000
  })

  return (
    <div style={style}> // Wrapper size is required because InsightViewer's width/height is '100%'.
      <InsightViewer image={image} />
    </div>
  )
}
`
