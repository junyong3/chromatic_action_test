import React from 'react'
import { domainType, domainViewIdType, viewIdType } from './rotuerType'
import { routeList } from '@routes/RouteList'

interface RedirectOption {
  isLoggedIn: boolean
  domainKey?: domainType
  domainViewId?: domainViewIdType
  viewId?: viewIdType
}

const useRedirect = () => {
  return function getRedirect(option: RedirectOption): JSX.Element {
    const {
      isLoggedIn,
      viewId,
      domainViewId = 'Home',
      domainKey = 'ROOT',
    } = option

    if (isLoggedIn) {
      if (viewId) {
        return (
          routeList[domainKey].find((d) => d.name === viewId)?.component ?? (
            <div />
          )
        )
      } else {
        return (
          routeList[domainKey].find((d) => d.name === domainViewId)
            ?.component ?? <div />
        )
      }
    } else {
      return <div />
    }
  }
}
export default useRedirect
