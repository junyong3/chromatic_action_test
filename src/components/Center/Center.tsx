import { Grid } from '@mui/material'
import React, { ReactNode } from 'react'

const Center = ({ children }: { children: ReactNode }) => {
  return (
    <Grid
      sx={{ width: '100%', height: '100%' }}
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item>{children}</Grid>
    </Grid>
  )
}

export default Center
