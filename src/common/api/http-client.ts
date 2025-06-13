import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import axios from 'axios'
import tokenService from './token.service'

function httpClient(baseApi: string | null = null): AxiosInstance {
  const client = axios.create({
    baseURL: baseApi ?? `${import.meta.env.VITE_API_URL}/`,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  client.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = tokenService.getLocalAccessToken()
      if (token && config.headers)
        config.headers.Authorization = `Bearer ${token}`

      return config
    },
    (error) => {
      return Promise.reject(error)
    },
  )

  client.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      if (error.response.statusText)
        useNotifyStore().error(error.response.statusText)

      return Promise.reject(error)
    },
  )
  return client
}

export default httpClient
