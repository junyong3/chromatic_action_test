import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LocalStorageKey, removeItem } from '@utils/storage/localStorage'
import { useAuthStore } from '@stores/auth.store'
import { To } from '@routes/To'
import * as Sentry from '@sentry/react'

function TempHeader() {
  const navigate = useNavigate()
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn)

  const handleClickLogout = () => {
    setIsLoggedIn(false)
    removeItem(LocalStorageKey.REFRESH_TOKEN)
    Sentry.setUser(null)
    navigate(To.Login)
  }

  return (
    <header>
      <ul>
        <li>
          <button onClick={handleClickLogout} data-sb-kind={'pages/Login'}>
            Log Out
          </button>
        </li>
        <li>
          <Link to={To.ChangePassword} data-sb-kind={'pages/ChangePassword'}>
            Change Password
          </Link>
        </li>
        <li>
          <Link to={To.IAMHome} data-sb-kind={'pages/IAM/Home'}>
            인가 어드민
          </Link>
        </li>
        <li>
          <Link to={To.CommerceHome} data-sb-kind={'pages/Commerce/Home'}>
            커머스 어드민
          </Link>
        </li>
        <li>
          <Link to={To.MDMHome} data-sb-kind={'pages/MDM/Home'}>
            MDM 어드민
          </Link>
        </li>
      </ul>
    </header>
  )
}

export default TempHeader
