import { PropsWithChildren } from 'react'
import { Stack } from '@mui/system'

function SearchBoxRow({ children }: PropsWithChildren<any>) {
  return (
    <Stack direction={'row'} alignItems={'center'} spacing={1}>
      {children}
    </Stack>
  )
}

export default SearchBoxRow
