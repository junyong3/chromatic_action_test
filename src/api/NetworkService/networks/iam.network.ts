import { AxiosInstance } from 'axios'

class IAMNetwork {
  private readonly legacyAPI: AxiosInstance
  private readonly coreAPI: AxiosInstance

  constructor(legacyAPI: AxiosInstance, coreAPI: AxiosInstance) {
    this.legacyAPI = legacyAPI
    this.coreAPI = coreAPI
  }

  async getUsers() {
    const url = '/iam/users'
    const { data: response } = await this.coreAPI.get(url)
    const { data } = response
    return data
  }

  async getUser(id: string) {
    const url = `/iam/users/${id}`
    const { data: response } = await this.coreAPI.get(url)
    const { data } = response
    return data
  }

  async getRoles() {
    const url = '/iam/roles'
    const { data: response } = await this.coreAPI.get(url)
    const { data } = response
    return data
  }

  async getRole(id: number) {
    const url = `/iam/roles/${id}`
    const { data: response } = await this.coreAPI.get(url)
    const { data } = response
    return data
  }

  async prePareRoleCreation() {
    const url = '/iam/roles/prepare-creation'
    const { data: response } = await this.coreAPI.get(url)
    const { data } = response
    return data
  }

  async createRole(params: { name: string; userIds: string[] }) {
    const url = '/iam/roles'
    const { data: response } = await this.coreAPI.post(url, params)
    return response
  }

  async updateRole(id: number, params: { name: string; userIds: string[] }) {
    const url = `/iam/roles/${id}`
    const { data: response } = await this.coreAPI.put(url, params)
    return response
  }

  async deleteRole(id: number) {
    const url = `/iam/roles/${id}`
    const { data: response } = await this.coreAPI.delete(url)
    return response
  }

  async getPermissions() {
    const url = '/iam/permissions'
    const { data: response } = await this.coreAPI.get(url)
    const { data } = response
    return data
  }

  async getPermission(id: number) {
    const url = `/iam/permissions/${id}`
    const { data: response } = await this.coreAPI.get(url)
    const { data } = response
    return data
  }

  async createPermission(params: { name: string; description: string }) {
    const url = '/iam/permissions'
    const { data: response } = await this.coreAPI.post(url, params)
    return response
  }

  async updatePermission(
    id: number,
    params: { name: string; description: string }
  ) {
    const url = `/iam/permissions/${id}`
    const { data: response } = await this.coreAPI.put(url, params)
    return response
  }

  async deletePermission(id: number) {
    const url = `/iam/permissions/${id}`
    const { data: response } = await this.coreAPI.delete(url)
    return response
  }
}

export default IAMNetwork
