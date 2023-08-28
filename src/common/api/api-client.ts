import type { AxiosInstance } from 'axios'
import axios from 'axios'

const apiClient: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.BASE_URL}/`,
  headers: {
    'Content-Type': 'application/json',
  },
})
export default apiClient
