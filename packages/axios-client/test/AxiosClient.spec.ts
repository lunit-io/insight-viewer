import AxiosClient, { APIError } from '../src/index'
import { server } from '../src/mocks/mswServer'
import {
  networkErrorHandlers,
  error401Handlers,
  error403Handlers,
  error404Handlers,
  error500Handlers,
  error502Handlers,
  error503Handlers,
} from '../src/mocks/handlers'
import './setupTests'
import { ERROR_MESSAGE } from '../src/mocks/constant'

describe('AxiosClient', () => {
  let axiosClient: AxiosClient

  beforeAll(() => {
    axiosClient = new AxiosClient({
      baseURL: 'https://api.backend.dev',
    })
  })

  describe('200 OK', () => {
    it('shows data', async () => {
      const { data, error } = await axiosClient.request('GET', '/superhero')

      expect(data).toMatchObject([
        { superheroName: 'Batman' },
        { superheroName: 'Superman' },
        { superheroName: 'Flash' },
      ])
      expect(error).toBeUndefined()
    })
  })

  describe('Network Error', () => {
    it('shows error message', async () => {
      server.use(...networkErrorHandlers)

      const { error: getError } = await axiosClient.request('GET', '/api')
      const { error: postError } = await axiosClient.request('POST', '/api', {
        data: { username: 'lunit' },
      })
      expect(getError instanceof Error).toBeTruthy()
      expect(getError?.message).toBe(ERROR_MESSAGE.Network)
      expect(postError instanceof Error).toBeTruthy()
      expect(postError?.message).toBe(ERROR_MESSAGE.Network)
    })
  })

  describe('Client Error', () => {
    it('shows error message on 401 error', async () => {
      server.use(...error401Handlers)

      const { error: getError401 } = await axiosClient.request('GET', '/api')
      const { error: postError401 } = await axiosClient.request('POST', '/api')
      expect((<APIError>getError401).status).toBe(401)
      expect(getError401?.message).toBe(ERROR_MESSAGE[401])
      expect((<APIError>postError401).status).toBe(401)
      expect(postError401?.message).toBe(ERROR_MESSAGE[401])
    })

    it('shows error message on 403 error', async () => {
      server.use(...error403Handlers)

      const { error: getError403 } = await axiosClient.request('GET', '/api')
      const { error: postError403 } = await axiosClient.request('POST', '/api')
      expect((<APIError>getError403).status).toBe(403)
      expect(getError403?.message).toBe(ERROR_MESSAGE[403])
      expect((<APIError>postError403).status).toBe(403)
      expect(postError403?.message).toBe(ERROR_MESSAGE[403])
    })

    it('shows error message on 404 error', async () => {
      server.use(...error404Handlers)

      const { error: getError404 } = await axiosClient.request('GET', '/api')
      const { error: postError404 } = await axiosClient.request('POST', '/api')
      expect((<APIError>getError404).status).toBe(404)
      expect(getError404?.message).toBe(ERROR_MESSAGE[404])
      expect((<APIError>postError404).status).toBe(404)
      expect(postError404?.message).toBe(ERROR_MESSAGE[404])
    })
  })

  describe('Server Error', () => {
    it('shows error message on 500 error', async () => {
      server.use(...error500Handlers)

      const { error: getError500 } = await axiosClient.request('GET', '/api')
      const { error: postError500 } = await axiosClient.request('POST', '/api')
      expect((<APIError>getError500).status).toBe(500)
      expect(getError500?.message).toBe(ERROR_MESSAGE[500])
      expect((<APIError>postError500).status).toBe(500)
      expect(postError500?.message).toBe(ERROR_MESSAGE[500])
    })

    it('shows error message on 502 error', async () => {
      server.use(...error502Handlers)

      const { error: getError502 } = await axiosClient.request('GET', '/api')
      const { error: postError502 } = await axiosClient.request('POST', '/api')
      expect((<APIError>getError502).status).toBe(502)
      expect(getError502?.message).toBe(ERROR_MESSAGE[502])
      expect((<APIError>postError502).status).toBe(502)
      expect(postError502?.message).toBe(ERROR_MESSAGE[502])
    })

    it('shows error message on 503 error', async () => {
      server.use(...error503Handlers)

      const { error: getError503 } = await axiosClient.request('GET', '/api')
      const { error: postError503 } = await axiosClient.request('POST', '/api')
      expect((<APIError>getError503).status).toBe(503)
      expect(getError503?.message).toBe(ERROR_MESSAGE[503])
      expect((<APIError>postError503).status).toBe(503)
      expect(postError503?.message).toBe(ERROR_MESSAGE[503])
    })
  })
})
