import { PropsWithChildren } from 'react'
import { SearchFormItemProp } from './Props'
import Typography from '@components/Typography'
import { Stack } from '@mui/material'

function SearchFormItem({
  label,
  required = false,
  labelWidth = 100,
  children,
}: PropsWithChildren<SearchFormItemProp>) {
  return (
    <Stack direction={'row'} alignItems={'center'} width={'100%'}>
      <Typography
        required={required}
        variant={'subtitle2'}
        sx={{ width: labelWidth }}
      >
        {label}
      </Typography>
      <Stack
        direction={'row'}
        alignItems={'center'}
        spacing={1}
        sx={{ flex: 1 }}
      >
        {children}
      </Stack>
    </Stack>
  )
}

export default SearchFormItem
