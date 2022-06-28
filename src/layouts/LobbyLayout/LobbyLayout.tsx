import TempHeader from '@components/TempHeader'
import { Divider } from '@mui/material'
import React, { PropsWithChildren } from 'react'

function LobbyLayout({ children }: PropsWithChildren<Record<string, unknown>>) {
  return (
    <div id="layout">
      <TempHeader />
      <Divider />
      <main id="main">{children}</main>
    </div>
  )
}

export default LobbyLayout
