import ky from 'ky'
import { RequestInterceptor } from 'types'
import { loadingProgressMessage } from '../messageService'

type HttpClient = (url: string) => Promise<ArrayBuffer>
type HttpClientOptions = {
  requestInterceptor: RequestInterceptor
  timeout: number
}
type GetHttpClient = (options: HttpClientOptions) => HttpClient

export const getHttpClient: GetHttpClient = options => {
  const httpClient: HttpClient = async url => {
    const http = ky.create({
      timeout: options.timeout,
      hooks: {
        beforeRequest: [
          request => {
            options.requestInterceptor(request)
          },
        ],
      },
      onDownloadProgress: async progress => {
        const noContentLength = progress.percent === 0 && progress.totalBytes === 0 && progress.transferredBytes > 0

        loadingProgressMessage.sendMessage(noContentLength ? 100 : Math.round(progress.percent * 100))
      },
    })

    const res = await http.get(url)
    return res.arrayBuffer()
  }

  return httpClient
}
