import type { AxiosInstance } from 'axios'
import HttpClient from './http-client'
import type { PaginatedList } from '~/models/PaginatedList'

import { type PagedAndSortedRequest, defaultOptions } from '~/models/PagedAndSortedRequest'
import type { ListResult } from '~/models/ListResult'

export class ApiService {
  private readonly apiBase
  private httpClient: AxiosInstance
  constructor(apiBase: string, service = null) {
    this.apiBase = apiBase
    this.httpClient = HttpClient(service)
  }

  async get<T>(url = ''): Promise<T> {
    const response = await this.httpClient.get(`${this.apiBase}/${url}`)
    return response.data
  }

  async getList<T>(url = '', params: any): Promise<ListResult<T>> {
    const response = await this.httpClient.get<ListResult<T>>(`${this.apiBase}/${url}`, { params })
    return response.data as ListResult<T>
  }

  async getPagedList<T>(url = '', options: PagedAndSortedRequest = defaultOptions): Promise<PaginatedList<T>> {
    const response = await this.httpClient.get<PaginatedList<T>>(`${this.apiBase}/${url}`, { params: options })
    return response.data as PaginatedList<T>
  }

  async query<T>(url: string, params?: any): Promise<T> {
    const result = await this.httpClient.get<T>(`${this.apiBase}/${url}`, { params })
    return result.data
  }

  async post<T>(url: string, data: any): Promise<T> {
    const response = await this.httpClient.post<T>(`${this.apiBase}/${url}`, data)
    return response.data
  }

  async put<T>(url: string, data: any): Promise<T> {
    try {
      return this.httpClient.put(`${this.apiBase}/${url}`, data)
    }
    catch (error) {
      console.error(`${error} was occurred`)
      throw new Error('cannot post')
    }
  }

  async delete<T>(url: string): Promise<T> {
    try {
      return this.httpClient.delete(`${this.apiBase}/${url}`)
    }
    catch (error) {
      throw new Error(`${error} was occurred`)
    }
  }

  async getBlobFile(url: string, params: any) {
    return this.httpClient
      .get(url, {
        params,
        responseType: 'blob',
      })
      .catch((error) => {
        throw new Error(`ApiService ${error}`)
      })
  }

  async postFile(url: string, params: { files: any[] }) {
    const formData = new FormData()
    params.files.forEach((file) => {
      formData.append('files', file)
    })
    return this.httpClient.post(`${url}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }
}
