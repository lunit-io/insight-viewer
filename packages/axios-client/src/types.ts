import {
  AxiosRequestConfig,
  AxiosBasicCredentials,
  AxiosTransformer,
  AxiosResponse,
} from 'axios'

export type APIError =
  | (Pick<AxiosResponse, 'data'> & {
      message: string
      status?: number
    })
  | {
      message: string
      status: undefined
      data: undefined
    }

export type ResponseSuccess<D> = {
  data: D
  error: undefined
}
export type ResponseError = {
  data: undefined
  error?: APIError
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
  paramsSerializer?: AxiosRequestConfig['paramsSerializer']
}

export type APIResponse<D> = ResponseSuccess<D> | ResponseError
