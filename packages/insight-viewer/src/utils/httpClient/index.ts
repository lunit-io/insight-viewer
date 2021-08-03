import ky from 'ky'
import { loadingProgressMessage } from '../messageService'
import { RequestInterceptor } from '../../types'

type HttpClient = (url: string) => Promise<ArrayBuffer>
type GetHttpClient = ({
  requestInterceptor,
  multiple,
}: {
  requestInterceptor: RequestInterceptor
  multiple?: boolean
}) => HttpClient

export const getHttpClient: GetHttpClient = ({
  requestInterceptor,
  multiple = false,
}) => {
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
        if (multiple) return

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
