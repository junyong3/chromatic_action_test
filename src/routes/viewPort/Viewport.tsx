import React, { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import { useAuthStore } from '@stores/auth.store'
import useAuthEffect from '@hooks/useAuthEffect'
import { RouteList } from '@src/routes/RouteList'
import useAuthRouterPath from '@hooks/useAuthRouterPath'
import LinearProgress from '@mui/material/LinearProgress'

const Viewport = () => {
  const isAuthEffectLoading = useAuthStore((state) => state.isAuthEffectLoading)
  const routers = useRoutes([
    ...RouteList.ROOT,
    ...RouteList.IAM,
    ...RouteList.MDM,
    ...RouteList.Commerce,
  ])
  // 인증체크
  useAuthEffect()
  // router 체크
  useAuthRouterPath()
  if (isAuthEffectLoading) {
    return null
  }

  return <Suspense fallback={<LoadingFallback />}>{routers}</Suspense>
}
export default Viewport

function LoadingFallback() {
  return <LinearProgress />
}
