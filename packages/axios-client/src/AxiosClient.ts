import _axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  Method,
} from 'axios'
import {
  HTTPClientProps,
  APIResponse,
  ResponseSuccess,
  ResponseError,
} from './types'

export class AxiosClient {
  private readonly instance: AxiosInstance

  constructor(props: HTTPClientProps) {
    const {
      baseURL,
      headers,
      timeout = 3000,
      withCredentials,
      auth,
      transformRequest,
      transformResponse,
      validateStatus = status => status >= 200 && status < 300,
    } = props

    this.instance = _axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        headers,
      },
      timeout,
      withCredentials,
      auth,
      transformRequest,
      transformResponse,
      validateStatus,
    })
  }

  private handleSuccess = <D>(res: AxiosResponse<D>): ResponseSuccess<D> => ({
    data: res.data,
    error: undefined,
  })

  private handleError = (error: AxiosError): ResponseError => {
    if (!error.response) {
      return {
        data: undefined,
        error,
      }
    }

    const { status, statusText, data } = error.response
    return {
      data: undefined,
      error: {
        message: statusText,
        status,
        data,
      },
    }
  }

  public request = <D extends Record<string, unknown> | string>(
    method: Method,
    url: string,
    config?: AxiosRequestConfig
  ): Promise<APIResponse<D>> =>
    this.instance
      .request<D>({ ...config, method, url })
      .then(this.handleSuccess)
      .catch((error: AxiosError) => this.handleError(error))
}
