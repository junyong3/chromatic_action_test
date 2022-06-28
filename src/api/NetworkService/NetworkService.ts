import { CORE_API_ENDPOINT, LEGACY_API_ENDPOINT } from '@config'
import { AuthRefreshTokenRequestDto } from '@api/dto/auth.refreshToken.request.dto'
import { AuthRefreshTokenResponseDto } from '@api/dto/auth.refreshToken.response.dto'
import { IAMErrorResponseDto } from '@api/dto/iam.response.dto'
import { getItem, LocalStorageKey, setItem } from '@utils/storage/localStorage'
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios'
import ErrorCode from './errorCode'
import AuthNetwork from './networks/auth.network'
import IAMNetwork from './networks/iam.network'

class NetworkService {
  // Api servers
  static legacyAPI = axios.create({ baseURL: LEGACY_API_ENDPOINT })
  static coreAPI = axios.create({ baseURL: CORE_API_ENDPOINT })

  // Networks by context
  public static auth: AuthNetwork = new AuthNetwork(NetworkService.legacyAPI)
  public static iam: IAMNetwork = new IAMNetwork(
    NetworkService.legacyAPI,
    NetworkService.coreAPI
  )

  public static factoryResponseInterceptor(apiServer: AxiosInstance) {
    return (error: AxiosError<IAMErrorResponseDto<any>>) => {
      const prevRequest = error.config
      const errorCode = error.response?.data?.code
      const refreshToken = getItem(LocalStorageKey.REFRESH_TOKEN)

      switch (errorCode) {
        case ErrorCode.TOKEN_EXPIRED:
          if (refreshToken)
            return this.regenerateToken(refreshToken, apiServer, prevRequest)
          else window.location.href = '/login'
          break
        case ErrorCode.TOKEN_INVALID_FORMAT:
        case ErrorCode.REFRESH_TOKEN_EXPIRED:
          localStorage.removeItem(LocalStorageKey.REFRESH_TOKEN)
          window.location.href = '/login'
      }

      // Server에서 핸들링하고 있는 에러
      if (errorCode) {
        return error.response
      } else {
        // Server에서 핸들링하고 있지 않은 에러
        // ex) Network Error
        return Promise.reject(error)
      }
    }
  }

  public static async regenerateToken(
    refreshToken: string,
    apiServer?: AxiosInstance,
    prevRequest?: AxiosRequestConfig<any>
  ) {
    const url = 'api/v1/auth/token/refresh'
    const requestData = { refresh_token: refreshToken }
    const { data: response } = await this.legacyAPI.post<
      AuthRefreshTokenRequestDto,
      AxiosResponse<AuthRefreshTokenResponseDto>,
      AuthRefreshTokenRequestDto
    >(url, requestData)

    const { success, data } = response

    if (success) {
      this.setAccessToken(data.access_token)
      this.setRefreshToken(data.refresh_token)
      if (apiServer && prevRequest) return apiServer(prevRequest)
    }

    return response
  }

  public static setAccessToken(token: string) {
    this.legacyAPI.defaults.headers.common['Authorization'] = `Bearer ${token}`
    this.coreAPI.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  public static setRefreshToken(token: string) {
    setItem(LocalStorageKey.REFRESH_TOKEN, token)
  }
}

NetworkService.legacyAPI.interceptors.response.use(
  (response) => response,
  NetworkService.factoryResponseInterceptor(NetworkService.legacyAPI)
)
NetworkService.coreAPI.interceptors.response.use(
  (response) => response,
  NetworkService.factoryResponseInterceptor(NetworkService.coreAPI)
)

export default NetworkService
