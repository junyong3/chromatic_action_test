import { To } from '@routes/To'
import { useAuthStore } from '@stores/auth.store'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useNetwork from '@hooks/useNetwork'

// 로그인 안해도 접근 가능
// ChangePassword 9
const enablePath = [To.Error, To.ChangePassword]

function useAuthRouterPath() {
  const location = useLocation()
  const navigate = useNavigate()
  const isOnLine = useNetwork()
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)

  useEffect(() => {
    if (isLoggedIn) {
      // 로그인 상태에서 로그인 페이지에 접근하려 하는 경우
      if (location.pathname === To.Login) {
        navigate(To.Home, { replace: true })
      }
    } else {
      // 비로그인 상태 && 온라인 상태
      if (isOnLine) {
        // 로그인 안해도 접근 가능 URL List
        if (enablePath.includes(location.pathname)) {
          // if (location.pathname !== To.Error) {
          navigate(location.pathname, {
            replace: true,
          })
        }
      }
    }
  }, [location.pathname, navigate, isLoggedIn, isOnLine])
}

export default useAuthRouterPath
