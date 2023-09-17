import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import axios from 'axios'
import { useOidcStore } from 'vue3-oidc'

function httpClient(baseApi: string | null = null): AxiosInstance {
  const client
    = axios.create({
      baseURL: baseApi ?? `${import.meta.env.VITE_APP_API_URL}/`,
      headers: {
        'Content-Type': 'application/json',
      },
    })

  client.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = useOidcStore().state.value.token
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
      if (response.config.method !== 'get') {
        const successMsg = 'operation successfully completed'
        useNotificationsStore().addNotification({ type: 'success', message: successMsg })
      }
      return response
    },
    (error) => {
      if (error.message === 'Network Error') {
        useNotificationsStore().addNotification({ type: 'error', message: 'Network Error' })
        return Promise.reject(error)
      }
      let errorMessage = ''
      const validationErrors = getValidationErrors(error)
      errorMessage = getErrorMessage(error)
      // ToDo: should be log in switch
      switch (error.response.status) {
        case 400:
          useNotificationsStore().addNotification({ type: 'error', message: errorMessage ?? 'BadRequest', validationErrors })
          break
        case 401:
        case 403:
        case 500:
          useNotificationsStore().addNotification({ type: 'error', message: errorMessage })
          break
        case 503:
          useNotificationsStore().addNotification({ type: 'error', message: errorMessage, validationErrors, hideAfterRouting: false })
          break
        default:
          useNotificationsStore().addNotification({ type: 'error', message: errorMessage, validationErrors, hideAfterRouting: false })

          break
      }
      return Promise.reject(error)
    },
  )

  return client
}

function getValidationErrors(error: any): any[] {
  if (!Object.prototype.hasOwnProperty.call(error, 'response'))
    return []

  const validationErrors = []
  if (error.response.data && error.response.data.errors) {
    for (const [key, value] of Object.entries(error.response.data.errors)) {
      validationErrors.push(
        value[0],
      )
    }
  }
  return validationErrors
}

function getErrorMessage(error: any): string {
  const message = error.response?.data?.error?.message
  if (message)
    return message

  if (Object.prototype.hasOwnProperty.call(error, 'message') && error.message)
    return error.message

  return ''
}
export default httpClient
