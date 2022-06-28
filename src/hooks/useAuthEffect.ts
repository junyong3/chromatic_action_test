import { To } from '@routes/To'
import NetworkService from '@api/NetworkService'
import { getItem, LocalStorageKey } from '@utils/storage/localStorage'
import { useAuthStore } from '@stores/auth.store'
import { useCallback, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function useAuthEffect() {
  const location = useLocation()
  const navigate = useNavigate()

  const refreshToken = getItem(LocalStorageKey.REFRESH_TOKEN)
  const isAuthEffectLoading = useAuthStore((state) => state.isAuthEffectLoading)
  const setIsAuthEffectLoading = useAuthStore(
    (state) => state.setIsAuthEffectLoading
  )
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn)
  const setLoggedEmail = useAuthStore((state) => state.setLoggedEmail)

  const logInUsingRefreshToken = useCallback(async () => {
    const { data } = await NetworkService.regenerateToken(
      refreshToken as string
    )

    setLoggedEmail(data.username)
    setIsLoggedIn(true)
  }, [setIsLoggedIn, refreshToken, setLoggedEmail])

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
        }
        // 리프레시 토큰이 없으면 무조건 로그인 화면으로
        else {
          navigate(To.Login, { replace: true })
          setIsAuthEffectLoading(false)
        }
      }
    }

    initAuth().catch((error) => {
      console.error(error)

      navigate(To.Login, { replace: true })
      setIsAuthEffectLoading(false)
    })
  }, [
    navigate,
    refreshToken,
    isAuthEffectLoading,
    setIsAuthEffectLoading,
    location.pathname,
    logInUsingRefreshToken,
  ])

  useEffect(() => {
    if (!isAuthEffectLoading) {
      // 로그인 상태에서 로그인 페이지에 접근하려 하는 경우
      if (isLoggedIn && location.pathname === To.Login) {
        navigate(To.Home, { replace: true })
      }
      // 비로그인 상태에서 Private 페이지에 접근하려 하는 경우
      if (
        !isLoggedIn &&
        ![To.Login, To.ChangePassword].includes(location.pathname)
      ) {
        navigate(To.Login, { replace: true })
      }
    }
  }, [location.pathname, navigate, isLoggedIn, isAuthEffectLoading])
}

export default useAuthEffect
