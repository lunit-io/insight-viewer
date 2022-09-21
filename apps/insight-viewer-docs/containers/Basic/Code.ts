export const DICOM_CODE_V1 = `\
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
          \`\${window.location.origin}/workers/610.bundle.min.worker.js\`,
          \`\${window.location.origin}/workers/888.bundle.min.worker.js\`,
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

export const DICOM_CODE_V2 = `\
import InsightViewer, { useImage } from '@lunit/insight-viewer'
import ky from 'ky'

const style = {
  width: '500px',
  height: '500px'
}

const httpClient = async (url: string) => {
  const http = ky.create({})
  const res = await http.get(url)
  return res.arrayBuffer()
}

export default function App() {
  const { loadingState, image } = useImage({
    wadouri: IMAGE_ID,
    loader: httpClient, // optional, but can't use this property with requestInterceptor, onError, timeout
    /**
     * required if you want to support more transfer syntaxes
     * see: https://github.com/cornerstonejs/cornerstoneWADOImageLoader/issues/403
     */
    loaderOptions: {
      webWorkerManagerOptions: {
        webWorkerTaskPaths: [
          \`\${window.location.origin}/workers/610.bundle.min.worker.js\`,
          \`\${window.location.origin}/workers/888.bundle.min.worker.js\`,
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
