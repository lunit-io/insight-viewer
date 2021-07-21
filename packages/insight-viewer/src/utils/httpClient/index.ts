import ky from 'ky'
import { loadingProgressMessage } from '../messageService'
import { RequestInterceptor } from '../../types'

type HttpClient = (url: string) => Promise<ArrayBuffer>

export default function getHttpClient(
  requestInterceptor: RequestInterceptor,
  multiple = false
): HttpClient {
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
        if (!multiple)
          loadingProgressMessage.sendMessage(Math.round(progress.percent * 100))
      },
    })

    const res = await http.get(url)
    return res.arrayBuffer()
  }

  return httpClient
}
