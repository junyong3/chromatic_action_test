import { To } from '@routes/To'
import Instance from '@api/Instance'
import { getItem, LocalStorageKey } from '@utils/storage/localStorage'
import { useAuthStore } from '@stores/auth.store'
import { useCallback, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useNetwork from '@hooks/useNetwork'
import { useMutationWrap } from '@queries/useMutation'
import { RefreshTokenReq, RefreshTokenRes } from '@api/model/IAM/refreshToken'
import { IAM_API_PATH } from '@api/path/IAM/iamPath'

function useAuthEffect() {
  const location = useLocation()
  const navigate = useNavigate()
  const isOnLine = useNetwork()

  const { mutateAsync } = useMutationWrap<RefreshTokenRes>()

  const refreshToken = getItem(LocalStorageKey.REFRESH_TOKEN)
  const isAuthEffectLoading = useAuthStore((state) => state.isAuthEffectLoading)
  const setIsAuthEffectLoading = useAuthStore(
    (state) => state.setIsAuthEffectLoading
  )
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn)
  const setLoggedEmail = useAuthStore((state) => state.setLoggedEmail)

  // 네트워크 연결 체크
  useEffect(() => {
    if (!isOnLine) {
      navigate(To.Error, {
        replace: true,
        state: {
          type: 'NETWORK_ERROR',
        },
      })
    }
  }, [isOnLine, navigate])

  const logInUsingRefreshToken = useCallback(async () => {
    const refreshTokenReqParams: RefreshTokenReq = {
      refreshToken: refreshToken as string,
    }

    const { data } = await mutateAsync(
      Instance.post<RefreshTokenReq>(
        IAM_API_PATH.REFRESH_TOKENS,
        refreshTokenReqParams
      )
    )

    Instance.setAccessToken(data.accessToken)
    Instance.setRefreshToken(data.refreshToken)

    setLoggedEmail(data.username)
    setIsLoggedIn(true)
  }, [setIsLoggedIn, refreshToken, setLoggedEmail, mutateAsync])

  useEffect(() => {
    async function initAuth(): Promise<void> {
      if (isAuthEffectLoading) {
        if (refreshToken) {
          await logInUsingRefreshToken()
          // 정상적인 `refreshToken`을 가지고 있는 채로 LOGIN 화면에 접근하면 무조건 홈 화면으로
          if (location.pathname === To.Login) {
            navigate(To.Home, { replace: true })
          }

          setIsAuthEffectLoading(false)
        } else {
          navigate(To.Login, {
            replace: true,
          })
          setIsAuthEffectLoading(false)
        }
      }
    }

    initAuth().catch((error) => {
      console.error(error)

      navigate(To.Error, {
        replace: true,
        state: {
          type: 'ERROR',
        },
      })
      setIsAuthEffectLoading(false)
    })
  }, [
    navigate,
    refreshToken,
    isAuthEffectLoading,
    setIsAuthEffectLoading,
    location.pathname,
    logInUsingRefreshToken,
    isOnLine,
  ])
}

export default useAuthEffect
