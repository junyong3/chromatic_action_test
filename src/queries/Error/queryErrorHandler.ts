import ErrorCode from '@api/NetworkService/errorCode'
import { AxiosError, AxiosRequestConfig, AxiosRequestHeaders } from 'axios'
import { IAMErrorRes } from '@api/model/IAMRes'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import { useCallback } from 'react'
import { To } from '@routes/To'
import { RefreshTokenReq } from '@api/model/IAM/refreshToken'
import { getItem, LocalStorageKey } from '@utils/storage/localStorage'
import NetworkService from '@api/NetworkService'
import * as Sentry from '@sentry/react'
import { IAM_API_PATH } from '@api/path/IAM/iamPath'

export const useErrorModule = () => {
  const navigate = useNavigate()
  const errorHandler = useCallback(
    (error: AxiosError<IAMErrorRes<any>>) => {
      apiErrorType(error, navigate)
    },
    [navigate]
  )

  return { errorHandler }
}
export const apiErrorType = (
  error: AxiosError<IAMErrorRes<any>>,
  navigate: NavigateFunction
) => {
  const httpStatus = error.response?.status
  const prevReq = error.config
  const errorCode = error.response?.data?.code
  switch (httpStatus) {
    case 400:
      http400Status(errorCode, navigate)
      break
    // Unauthorized
    case 401:
      http401Status(prevReq, errorCode, navigate)
      break
    // Forbidden
    case 403:
      http403Status(prevReq, errorCode, navigate)
      SentrySetContext(error)
      break
    case 0:
      SentrySetContext(error)
      if (error.code === ErrorCode.ERR_NETWORK) {
        navigate(To.Error, {
          replace: true,
          state: {
            type: 'NETWORK_ERROR',
          },
        })
      }
      break
    case 522:
    case 503:
      SentrySetContext(error)
      navigate(To.Error, {
        replace: true,
        state: {
          type: 'ERROR',
        },
      })
      break
    case 502:
      SentrySetContext(error)
      break
    default:
      SentrySetContext(error)
      navigate(To.Error, {
        replace: true,
        state: {
          type: 'ERROR',
        },
      })
      console.error('http status Code add', error)
  }
}

const http400Status = (
  errorCode: string | undefined,
  navigate: NavigateFunction
) => {
  switch (errorCode) {
    case ErrorCode.ACCESS_DENIED:
      console.log(ErrorCode.ACCESS_DENIED)
      break
    case ErrorCode.NO_MATCHED_USER:
      console.log(ErrorCode.NO_MATCHED_USER)
      navigate(To.Error, {
        replace: true,
        state: {
          type: 'ERROR',
        },
      })
      break
    // default:
  }
}
const http401Status = async (
  prevReq: AxiosRequestConfig<any>,
  errorCode: string | undefined,
  navigate: NavigateFunction
) => {
  const refreshToken = getItem(LocalStorageKey.REFRESH_TOKEN)

  switch (errorCode) {
    case ErrorCode.TOKEN_EXPIRED:
      if (refreshToken) {
        const refreshTokenReqParams: RefreshTokenReq = {
          refreshToken: refreshToken as string,
        }

        const { data } = await NetworkService.iam.post<RefreshTokenReq>(
          IAM_API_PATH.REFRESH_TOKENS,
          refreshTokenReqParams
        )

        NetworkService.setAccessToken(data.accessToken)
        NetworkService.setRefreshToken(data.refreshToken)

        if (prevReq) {
          const axiosReqHeaders = prevReq.headers as AxiosRequestHeaders
          axiosReqHeaders['Authorization'] = `Bearer ${data.accessToken}`

          return NetworkService.iamAPI(prevReq)
        }
      } else {
        window.location.href = '/login'
      }
      break
    case ErrorCode.TOKEN_INVALID_FORMAT:
    case ErrorCode.REFRESH_TOKEN_EXPIRED:
      localStorage.removeItem(LocalStorageKey.REFRESH_TOKEN)
      window.location.href = '/login'
      break
    case ErrorCode.NO_PERMISSION:
    case ErrorCode.NO_TOKEN_RECEIVED:
      navigate(To.Error, {
        replace: true,
        state: {
          type: 'UNAUTHORIZED',
        },
      })
      break
    default:
  }
}

const http403Status = async (
  prevReq: AxiosRequestConfig<any>,
  errorCode: string | undefined,
  navigate: NavigateFunction
) => {
  switch (errorCode) {
    case ErrorCode.FORBIDDEN:
      navigate(To.Error, {
        replace: false,
        state: {
          type: 'UNAUTHORIZED',
        },
      })
      break
    default:
  }
}

const SentrySetContext = (error: AxiosError<IAMErrorRes<any>>) => {
  const { method, url, params, data: configData, headers } = error.config // axios의 error객체
  const res = error.response // axios의 error객체
  Sentry.setContext('API_Request', {
    method,
    url,
    params,
    configData,
    headers,
  })
  if (res) {
    Sentry.setContext('API_Response', {
      status: res?.status,
      data: res?.data,
    })
  }

  Sentry.withScope((scope: Sentry.Scope) => {
    scope.setTag('APICall', 'Error')
    scope.setLevel('error')
    Sentry.captureException('API Error : ' + error)
  })
  // Sentry.captureException('API Request Detail :', )
  // Sentry.captureException('API Response Detail :' + error.response)
}
