import ky from 'ky'
import { loadingProgressMessage } from '../messageService'
import { RequestInterceptor } from '../../types'

type HttpClient = (url: string) => Promise<ArrayBuffer>
type GetHttpClient = (requestInterceptor: RequestInterceptor) => HttpClient

export const getHttpClient: GetHttpClient = requestInterceptor => {
  const httpClient: HttpClient = async url => {
    const http = ky.create({
      hooks: {
        beforeRequest: [
          request => {
            requestInterceptor(request)
          },
        ],
      },
      onDownloadProgress: async progress => {
        const noContentLength =
          progress.percent === 0 &&
          progress.totalBytes === 0 &&
          progress.transferredBytes > 0

        loadingProgressMessage.sendMessage(
          noContentLength ? 100 : Math.round(progress.percent * 100)
        )
      },
    })

    const res = await http.get(url)
    return res.arrayBuffer()
  }

  return httpClient
}
