import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios'

export class ApiClient {
  instance: AxiosInstance

  constructor() {
    this.instance = axios.create({
      baseURL: 'https://iptv-org.github.io/api/'
    })
  }

  get(pathname: string, config?: AxiosRequestConfig): Promise<any> {
    return this.instance.get(pathname, config)
  }
}
