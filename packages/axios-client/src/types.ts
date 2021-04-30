import {
  AxiosRequestConfig,
  AxiosBasicCredentials,
  AxiosTransformer,
  AxiosResponse,
} from 'axios'

export type APIError = Pick<AxiosResponse, 'data'> & {
  status: number
  message: string
}

export type ResponseSuccess<D> = {
  data: D
  error: undefined
}
export type ResponseError = {
  data: undefined
  error?: APIError | Error
}

export interface HTTPClientProps {
  baseURL: string
  timeout?: number
  headers?: AxiosRequestConfig['headers']
  withCredentials?: boolean
  auth?: AxiosBasicCredentials
  validateStatus?: (status: number) => boolean
  transformRequest?: AxiosTransformer[]
  transformResponse?: AxiosTransformer[]
}

export type APIResponse<D> = ResponseSuccess<D> | ResponseError
