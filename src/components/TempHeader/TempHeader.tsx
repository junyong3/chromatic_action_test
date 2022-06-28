import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LocalStorageKey, removeItem } from '@utils/storage/localStorage'
import { useAuthStore } from '@stores/auth.store'
import { To } from '@routes/To'

function TempHeader() {
  const navigate = useNavigate()
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn)

  const handleClickLogout = () => {
    setIsLoggedIn(false)
    removeItem(LocalStorageKey.REFRESH_TOKEN)
    navigate(To.Login)
  }

  return (
    <header>
      <ul>
        <li>
          <button onClick={handleClickLogout}>Log Out</button>
        </li>
        <li>
          <Link to={To.ChangePassword}>Change Password</Link>
        </li>
        <li>
          <Link to={To.IAMHome}>인가 어드민</Link>
        </li>
      </ul>
    </header>
  )
}

export default TempHeader
