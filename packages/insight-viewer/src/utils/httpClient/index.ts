import ky from 'ky'
import consola from 'consola'
import { lodingProgressMessage } from '../messageService'

export default async function httpClient(url: string): Promise<ArrayBuffer> {
  const http = ky.create({
    hooks: {
      beforeRequest: [
        request => {
          consola.info(request)
          // TODO: auth 사용여부에 따른 처리
          // if (isAuthenticated()) {
          //   request.headers.set('Authorization', `Bearer ${getAuthToken()}`)
          // }
        },
      ],
      afterResponse: [
        // TODO: auth 사용여부에 따른 처리 401/403
        // async (_req, _opts, response) => {
        //   // if (response.status === 401) {
        //   //   // Do something
        //   // }
        // },
      ],
    },
    onDownloadProgress: async progress => {
      lodingProgressMessage.sendMessage(Math.round(progress.percent * 100))
    },
  })

  const res = await http.get(url)
  return res.arrayBuffer()
}
