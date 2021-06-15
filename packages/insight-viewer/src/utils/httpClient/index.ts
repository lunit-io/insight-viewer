import ky from 'ky'
import { loadingProgressMessage } from '../messageService'
import { RequestInterceptor } from '../../types'

type HttpClient = (url: string) => Promise<ArrayBuffer>

export default function getHttpClient(
  isSingle: boolean,
  requestInterceptor: RequestInterceptor
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
        if (isSingle)
          loadingProgressMessage.sendMessage(Math.round(progress.percent * 100))
      },
    })

    const res = await http.get(url)
    return res.arrayBuffer()
  }

  return httpClient
}
