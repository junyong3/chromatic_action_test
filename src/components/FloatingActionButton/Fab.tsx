import { PropsWithChildren } from 'react'
import { Fab as MuiFab } from '@mui/material'
import { FabProps } from '@components/FloatingActionButton/Props'

function Fab(props: PropsWithChildren<FabProps>) {
  return <MuiFab {...props}></MuiFab>
}

export default Fab
