import axios from 'axios'
import { LocalStorageKey, setItem } from '@utils/storage/localStorage'
import { API_ROOT_PATH } from '@api/path/ROOTPath'
import ApiClass from './ApiClass'

class NetworkService {
  // Api servers
  static iamAPI = axios.create({
    baseURL: API_ROOT_PATH.IAM,
  })
  static commerceAPI = axios.create({
    baseURL: API_ROOT_PATH.COMMERCE,
  })
  static commercePaymentAPI = axios.create({
    baseURL: API_ROOT_PATH.COMMERCE_PAYMENT,
  })
  static commerceMemberAPI = axios.create({
    baseURL: API_ROOT_PATH.COMMERCE_MEMBER,
  })
  static mdmAPI = axios.create({
    baseURL: API_ROOT_PATH.MDM,
  })

  // Networks by context
  public static iam: ApiClass = new ApiClass(NetworkService.iamAPI)
  public static commerce: ApiClass = new ApiClass(NetworkService.commerceAPI)
  public static commercePayment: ApiClass = new ApiClass(
    NetworkService.commercePaymentAPI
  )
  public static commerceMember: ApiClass = new ApiClass(
    NetworkService.commerceMemberAPI
  )
  public static mdm: ApiClass = new ApiClass(NetworkService.mdmAPI)

  public static setAccessToken(token: string) {
    this.iamAPI.defaults.headers.common['Authorization'] = `Bearer ${token}`
    this.commerceAPI.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${token}`
    this.commercePaymentAPI.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${token}`
    this.commerceMemberAPI.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${token}`
    this.mdmAPI.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  public static setRefreshToken(token: string) {
    setItem(LocalStorageKey.REFRESH_TOKEN, token)
  }
  public static storybookTokenInject() {
    NetworkService.setAccessToken(import.meta.env.VITE_STORYBOOK_TOKEN)
  }
}

export default NetworkService
