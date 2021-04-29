import _axios, { AxiosInstance } from 'axios'

interface Prop {
  baseURL: string
  timeout?: number
  reqInterceptor?: {
    success?: () => void
    error?: () => void
  }
  resInterceptor?: {
    success?: () => void
    error?: () => void
  }
  needAuth?: boolean
}

export const axios = ({
  baseURL,
  timeout = 2000,
  reqInterceptor,
  resInterceptor,
  needAuth = false,
}: Prop): AxiosInstance => {
  const token = needAuth ? localStorage.getItem('access_token') : null

  const axiosInstance = _axios.create({
    baseURL,
    timeout,
    headers: {
      Authorization: token !== null && `Bearer ${token}`,
    },
    responseType: 'json',
  })

  axiosInstance.interceptors.request.use(
    config => {
      reqInterceptor?.success?.()
      return config
    },
    error => {
      reqInterceptor?.error?.()
      return Promise.reject(error)
    }
  )
  axiosInstance.interceptors.response.use(
    config => {
      resInterceptor?.success?.()
      return config
    },
    error => {
      resInterceptor?.error?.()
      return Promise.reject(error)
    }
  )

  return axiosInstance
}
