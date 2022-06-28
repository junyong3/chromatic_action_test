import React from 'react'
import { Route, Routes } from 'react-router-dom'
import useRedirect from './useRedirect'
import { useAuthStore } from '@stores/auth.store'
import useAuthEffect from '@hooks/useAuthEffect'
import { domainViewIdType, routerBase } from './rotuerType'
import { Path, routeList } from './RouteList'

const Viewport = () => {
  const getRedirect = useRedirect()
  const isLoggedIn = true
  const isAuthEffectLoading = useAuthStore((state) => state.isAuthEffectLoading)

  useAuthEffect()

  if (isAuthEffectLoading) return null

  return (
    <Routes>
      {/* Public Only Routes*/}
      <Route
        path={Path.Login}
        element={getRedirect({ viewId: 'Login', isLoggedIn })}
      />

      {/* Private Only Routes - start */}
      <Route
        path={Path.Home}
        element={getRedirect({ viewId: 'Home', isLoggedIn })}
      />

      {/* Both Public and Private Routes */}
      <Route
        path={Path.ChangePassword}
        element={getRedirect({ viewId: 'ChangePassword', isLoggedIn })}
      />

      {/* IAM Module */}
      <Route
        path={Path.IAM.Base}
        element={getRedirect({
          domainKey: 'IAM',
          domainViewId: 'Base',
          isLoggedIn,
        })}
      >
        {routeList.IAM.map((routeConfig: routerBase, index: number) => {
          const { name, path, type } = routeConfig
          const layoutType = type ?? ''
          if (layoutType === 'layout') {
            return (
              <Route
                key={`_${name}_${index}_${type}`}
                path={path}
                element={getRedirect({
                  domainViewId: name as domainViewIdType,
                  domainKey: 'IAM',
                  isLoggedIn,
                })}
              />
            )
          }
        })}
      </Route>

      <Route
        path={Path.IAM.Base}
        element={getRedirect({
          domainKey: 'IAM',
          domainViewId: 'Empty',
          isLoggedIn,
        })}
      >
        {routeList.IAM.map((routeConfig: routerBase, index: number) => {
          const { name, path, type } = routeConfig
          const layoutType = type ?? ''
          if (layoutType === 'empty') {
            return (
              <Route
                key={`_${name}_${index}_${type}`}
                path={path}
                element={getRedirect({
                  domainViewId: name as domainViewIdType,
                  domainKey: 'IAM',
                  isLoggedIn,
                })}
              />
            )
          }
        })}
      </Route>
    </Routes>
  )
}
export default Viewport
