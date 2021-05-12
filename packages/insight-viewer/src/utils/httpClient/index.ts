import ky from 'ky'
import { loadingProgressMessage } from '../messageService'
import { SetHeader } from '../../types'

type HttpClient = (url: string) => Promise<ArrayBuffer>

export default function getHttpClient(setHeader: SetHeader): HttpClient {
  const httpClient: HttpClient = async url => {
    const http = ky.create({
      hooks: {
        beforeRequest: [
          request => {
            setHeader(request)
          },
        ],
      },
      onDownloadProgress: async progress => {
        loadingProgressMessage.sendMessage(Math.round(progress.percent * 100))
      },
    })

    const res = await http.get(url)
    return res.arrayBuffer()
  }

  return httpClient
}
