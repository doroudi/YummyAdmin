import type { AxiosRequestConfig } from 'axios'
import axios from './api-client'
import tokenService from './token.service'

function setup() {
  axios.interceptors.request.use(
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
  axios.interceptors.response.use(
    (res) => {
      return res
    },
    async (err) => {
      const originalConfig = err.config
      if (originalConfig.url !== '/account/login' && err.response) {
        // Access Token was expired
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true
          try {
            const response = await axios.post('/auth/refreshtoken', {
              refreshToken: tokenService.getLocalRefreshToken(),
            })
            const { accessToken } = response.data
            tokenService.updateLocalAccessToken(accessToken)
            return axios(originalConfig)
          }
          catch (_error) {
            return Promise.reject(_error)
          }
        }
      }
      return Promise.reject(err)
    },
  )
}
export default setup
