import { AxiosInstance } from 'axios'

class ApiClass {
  private readonly APIUrl: AxiosInstance

  constructor(APIUrl: AxiosInstance) {
    this.APIUrl = APIUrl
  }

  async get<ReqParam>(key: string, params?: ReqParam) {
    const { data: res } = await this.APIUrl.get(key, { params })
    return res.data
  }

  async post<ReqParam>(key: string, params: ReqParam) {
    const { data: res } = await this.APIUrl.post(key, params)
    return res
  }

  async put<ReqParam>(key: string, params: ReqParam) {
    const { data: res } = await this.APIUrl.put(key, params)
    return res
  }

  async patch<ReqParam>(key: string, params: ReqParam) {
    const { data: res } = await this.APIUrl.patch(key, params)
    return res
  }

  async delete<ReqParam>(key: string, params?: ReqParam) {
    const { data: res } = await this.APIUrl.delete(key, { params })
    return res
  }
}

export default ApiClass
