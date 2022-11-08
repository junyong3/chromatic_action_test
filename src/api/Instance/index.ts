import axios, { AxiosRequestConfig } from 'axios'
import { LocalStorageKey, setItem } from '@utils/storage/localStorage'

export default class Instance {
  // Api servers
  static instance = axios.create()

  public static async get<ReqParam>(key: string, params?: ReqParam) {
    const { data: res } = await this.instance.get(key, { params })
    return res.data
  }

  public static async post<ReqParam>(
    key: string,
    params: ReqParam,
    config?: AxiosRequestConfig
  ) {
    const { data: res } = await this.instance.post(key, params, config)
    return res
  }

  public static async put<ReqParam>(key: string, params: ReqParam) {
    const { data: res } = await this.instance.put(key, params)
    return res
  }

  public static async patch<ReqParam>(key: string, params: ReqParam) {
    const { data: res } = await this.instance.patch(key, params)
    return res
  }

  public static async delete<ReqParam>(key: string, params?: ReqParam) {
    const { data: res } = await this.instance.delete(key, { params })
    return res
  }

  public static setAccessToken(token: string) {
    this.instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  public static setRefreshToken(token: string) {
    setItem(LocalStorageKey.REFRESH_TOKEN, token)
  }
  public static storybookTokenInject() {
    Instance.setAccessToken(import.meta.env.VITE_STORYBOOK_TOKEN)
  }
}
