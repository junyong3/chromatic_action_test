import { Stack } from '@mui/material'
import { PropsWithChildren } from 'react'

function SearchFormRow({ children }: PropsWithChildren<any>) {
  return (
    <Stack direction={'row'} alignItems={'center'} spacing={1}>
      {children}
    </Stack>
  )
}

export default SearchFormRow
